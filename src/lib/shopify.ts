
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
      recommendedStage: mapTagsToStage(node.tags)
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
      recommendedStage: mapTagsToStage(node.tags)
    };

  } catch (error) {
    console.error('Failed to fetch product:', error);
    return null;
  }
}

export async function createCheckout(productId: string, quantity: number = 1): Promise<string> {
  // In a real implementation, this would call checkoutCreate mutation
  // For now, we'll construct a direct permalink if possible or simulate success
  // Shopify Storefront API checkoutCreate requires productId (Base64)
  
  const mutation = `
    mutation checkoutCreate($input: CheckoutCreateInput!) {
      checkoutCreate(input: $input) {
        checkout {
          webUrl
        }
        checkoutUserErrors {
          code
          field
          message
        }
      }
    }
  `;

  try {
    // Note: productId from Storefront API is already Base64 (gid://shopify/Product/...)
    // But checkoutCreate needs Variant ID, not Product ID.
    // We need to fetch the first variant ID for the product first.
    // This is getting complex for a "mock" migration but let's try to be cleaner.
    // Since we don't have variant selection UI yet, we assume first variant.
    
    // 1. Fetch Variant ID and Handle
    const variantQuery = `
      query getProductVariant($id: ID!) {
        node(id: $id) {
          ... on Product {
            handle
            variants(first: 1) {
              edges {
                node {
                  id
                }
              }
            }
          }
        }
      }
    `;
    
    const variantRes = await fetch(`https://${SHOPIFY_STORE_DOMAIN}/api/2023-10/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN!,
      },
      body: JSON.stringify({ query: variantQuery, variables: { id: productId } }),
    });
    
    const variantData = await variantRes.json();
    const variantId = variantData.data?.node?.variants?.edges[0]?.node?.id;
    const handle = variantData.data?.node?.handle;

    if (!variantId) throw new Error("Variant not found");

    // 2. Create Checkout
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
            lineItems: [{ variantId, quantity }] 
          } 
        } 
      }),
    });

    const { data } = await res.json();
    
    if (data.checkoutCreate?.checkout?.webUrl) {
      return data.checkoutCreate.checkout.webUrl;
    }
    
    throw new Error("Failed to create checkout");

  } catch (error) {
    console.error("Checkout error:", error);
    
    // If we have the handle from the variant query (or passed in some way, but here we fetched it), use it.
    // But since `createCheckout` only takes productId, we must rely on fetching it or having it available.
    // However, the `createCheckout` signature doesn't take handle.
    // The robust fix is to use the handle if we fetched it, otherwise fail gracefully.
    // But wait, the `createCheckout` function is called from UI which HAS the product object.
    // The UI calls `createCheckout(product.id)`.
    
    // BETTER FIX: The fallback URL logic should happen in the UI component where we have the full product object,
    // OR we ensure we return a valid URL or throw.
    // But the requirement says: "Clicking Buy should generate: /dashboard/shop/success?product=actual-product-handle..."
    
    // Since we can't easily get the handle here if the API fails completely (e.g. network error),
    // we should modify the UI to handle the redirect itself using the data it ALREADY has.
    // But if we MUST return a URL from here for the fallback flow:
    
    // Let's try to fetch the handle again in the catch block if we don't have it? No, that's risky.
    // The best approach is to let the UI handle the navigation for the success simulation.
    
    // However, based on the prompt "We are getting ... product=unknown", this function is returning that string.
    // We need to change what this function returns or how it's called.
    
    // Strategy:
    // 1. We will NOT return a fallback URL from here. We will throw an error if checkout fails.
    // 2. The UI component will catch the error and redirect to the success page using the handle IT ALREADY HAS.
    
    throw error; // Re-throw to let UI handle the fallback redirect with correct handle
  }
}
