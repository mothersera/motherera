
// Shopify Storefront API Integration

export interface Product {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  price: string;
  compareAtPrice?: string | null;
  currency: string;
  images: { src: string; alt: string }[];
  category: 'Baby Care' | 'Feeding' | 'Sleep' | 'Hygiene & Safety' | 'Mother Wellness';
  tags: string[];
  recommendedStage?: string[]; // pregnancy, postpartum, newborn, toddler
  variantId?: string;
}

const SHOPIFY_STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const SHOPIFY_STOREFRONT_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN;

// Helper to categorize products based on tags
function mapTagsToCategory(tags: string[]): Product['category'] {
  if (tags.some(t => t.toLowerCase().includes('feeding'))) return 'Feeding';
  if (tags.some(t => t.toLowerCase().includes('sleep'))) return 'Sleep';
  if (tags.some(t => t.toLowerCase().includes('hygiene') || t.toLowerCase().includes('safety'))) return 'Hygiene & Safety';
  if (tags.some(t => t.toLowerCase().includes('wellness') || t.toLowerCase().includes('mom'))) return 'Mother Wellness';
  return 'Baby Care'; // Default
}

// Helper to map tags to recommended stage
function mapTagsToStage(tags: string[]): string[] {
  const stages = [];
  if (tags.some(t => t.includes('pregnancy'))) stages.push('pregnancy');
  if (tags.some(t => t.includes('postpartum'))) stages.push('postpartum');
  if (tags.some(t => t.includes('newborn'))) stages.push('newborn');
  if (tags.some(t => t.includes('toddler'))) stages.push('toddler');
  if (tags.some(t => t.includes('child'))) stages.push('child_0_5');
  return stages;
}

export async function fetchProducts(category?: string, stage?: string): Promise<Product[]> {
  const query = `
    query getProducts($first: Int!) {
      products(first: $first) {
        edges {
          node {
            id
            title
            handle
            description
            descriptionHtml
            tags
            images(first: 5) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            variants(first: 1) {
              edges {
                node {
                  id
                }
              }
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            compareAtPriceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  `;

  try {
    const res = await fetch(`https://${SHOPIFY_STORE_DOMAIN}/api/2023-10/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN!,
      },
      body: JSON.stringify({ query, variables: { first: 20 } }),
      cache: 'no-store', // Ensure fresh data
    });

    if (!res.ok) {
      console.error('Shopify API Error:', res.statusText);
      return [];
    }

    const { data } = await res.json();
    
    if (!data || !data.products) {
      return [];
    }

    let products: Product[] = data.products.edges.map(({ node }: any) => ({
      id: node.id,
      handle: node.handle,
      title: node.title,
      description: node.description,
      descriptionHtml: node.descriptionHtml,
      price: node.priceRange.minVariantPrice.amount,
      compareAtPrice: node.compareAtPriceRange?.minVariantPrice?.amount || null,
      currency: node.priceRange.minVariantPrice.currencyCode,
      images: node.images.edges.map(({ node }: any) => ({
        src: node.url,
        alt: node.altText || node.title
      })),
      category: mapTagsToCategory(node.tags),
      tags: node.tags,
      recommendedStage: mapTagsToStage(node.tags),
      variantId: node.variants.edges[0]?.node.id
    }));

    // Filter by Category
    if (category && category !== 'All') {
      products = products.filter(p => p.category === category);
    }

    // Sort by Stage Relevance
    if (stage) {
      products.sort((a, b) => {
        const aMatch = a.recommendedStage?.some(s => stage.includes(s)) ? 1 : 0;
        const bMatch = b.recommendedStage?.some(s => stage.includes(s)) ? 1 : 0;
        return bMatch - aMatch;
      });
    }

    return products;

  } catch (error) {
    console.error('Failed to fetch products from Shopify:', error);
    return [];
  }
}

export async function fetchProductByHandle(handle: string): Promise<Product | null> {
  const query = `
    query getProduct($handle: String!) {
      productByHandle(handle: $handle) {
        id
        title
        handle
        description
        descriptionHtml
        tags
        images(first: 5) {
          edges {
            node {
              url
              altText
            }
          }
        }
        variants(first: 1) {
          edges {
            node {
              id
            }
          }
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        compareAtPriceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
      }
    }
  `;

  try {
    const res = await fetch(`https://${SHOPIFY_STORE_DOMAIN}/api/2023-10/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN!,
      },
      body: JSON.stringify({ query, variables: { handle } }),
      cache: 'no-store',
    });

    if (!res.ok) return null;

    const { data } = await res.json();
    if (!data || !data.productByHandle) return null;

    const node = data.productByHandle;

    return {
      id: node.id,
      handle: node.handle,
      title: node.title,
      description: node.description,
      descriptionHtml: node.descriptionHtml,
      price: node.priceRange.minVariantPrice.amount,
      compareAtPrice: node.compareAtPriceRange?.minVariantPrice?.amount || null,
      currency: node.priceRange.minVariantPrice.currencyCode,
      images: node.images.edges.map(({ node }: any) => ({
        src: node.url,
        alt: node.altText || node.title
      })),
      category: mapTagsToCategory(node.tags),
      tags: node.tags,
      recommendedStage: mapTagsToStage(node.tags),
      variantId: node.variants.edges[0]?.node.id
    };

  } catch (error) {
    console.error('Failed to fetch product:', error);
    return null;
  }
}

export async function createCheckout(variantId: string, quantity: number = 1): Promise<string> {
  const mutation = `
    mutation checkoutCreate($input: CheckoutCreateInput!) {
      checkoutCreate(input: $input) {
        checkout {
          id
          webUrl
        }
        checkoutUserErrors {
          field
          message
        }
      }
    }
  `;

  try {
    const res = await fetch(`https://${SHOPIFY_STORE_DOMAIN}/api/2023-10/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN!,
      },
      body: JSON.stringify({ 
        query: mutation, 
        variables: { 
          input: {
            lineItems: [
              {
                variantId: variantId,
                quantity: quantity
              }
            ]
          }
        } 
      }),
    });

    const { data } = await res.json();
    
    if (data.checkoutCreate?.checkout?.webUrl) {
      return data.checkoutCreate.checkout.webUrl;
    }
    
    if (data.checkoutCreate?.checkoutUserErrors?.length > 0) {
       console.log("Checkout User Errors:", JSON.stringify(data.checkoutCreate.checkoutUserErrors, null, 2));
       throw new Error(data.checkoutCreate.checkoutUserErrors[0].message);
    }
    
    throw new Error("Failed to create checkout");

  } catch (error) {
    console.error("Checkout error:", error);
    throw error;
  }
}
