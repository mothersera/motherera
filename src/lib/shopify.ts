
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
  variantId?: string; // Default/First variant ID
  options: { name: string; values: string[] }[];
  variants: {
    id: string;
    title: string;
    price: { amount: string; currencyCode: string };
    image?: { src: string; alt: string };
    selectedOptions: { name: string; value: string }[];
  }[];
}

export interface CartItem {
  id: string; // Line item ID
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    price: {
      amount: string;
      currencyCode: string;
    };
    image: {
      url: string;
      altText: string;
    };
    product: {
      title: string;
      handle: string;
    };
  };
}

export interface Cart {
  id: string;
  checkoutUrl: string;
  lines: CartItem[];
  cost: {
    subtotalAmount: {
      amount: string;
      currencyCode: string;
    };
    totalAmount: {
      amount: string;
      currencyCode: string;
    };
  };
  totalQuantity: number;
}

const SHOPIFY_STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const SHOPIFY_STOREFRONT_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN;

async function shopifyFetch<T>(query: string, variables?: object): Promise<T> {
  if (!SHOPIFY_STORE_DOMAIN || !SHOPIFY_STOREFRONT_TOKEN) {
    throw new Error("Missing Shopify environment variables");
  }

  try {
    const res = await fetch(`https://${SHOPIFY_STORE_DOMAIN}/api/2023-10/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN,
      },
      body: JSON.stringify({ query, variables }),
      cache: 'no-store',
    });

    const { data, errors } = await res.json();

    if (errors) {
      console.error("GraphQL Errors:", JSON.stringify(errors, null, 2));
      throw new Error(errors[0].message);
    }

    return data;
  } catch (error) {
    console.error("Shopify Fetch Error:", error);
    throw error;
  }
}

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
    const data = await shopifyFetch<{ products: { edges: { node: any }[] } }>(query, { first: 20 });
    
    if (!data || !data.products) return [];

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
      variantId: node.variants.edges[0]?.node.id,
      options: [], // For fetchProducts, we don't fetch full options/variants to keep it light
      variants: [] // For fetchProducts, we don't fetch full options/variants to keep it light
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
        options(first: 20) {
          id
          name
          values
        }
        images(first: 10) {
          edges {
            node {
              url
              altText
            }
          }
        }
        variants(first: 20) {
          edges {
            node {
              id
              title
              price {
                amount
                currencyCode
              }
              image {
                url
                altText
              }
              selectedOptions {
                name
                value
              }
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
    const data = await shopifyFetch<{ productByHandle: any }>(query, { handle });
    
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
      variantId: node.variants.edges[0]?.node.id,
      options: node.options?.map((o: any) => ({ name: o.name, values: o.values })) || [],
      variants: node.variants.edges.map(({ node: v }: any) => ({
        id: v.id,
        title: v.title,
        price: v.price,
        image: v.image ? { src: v.image.url, alt: v.image.altText } : undefined,
        selectedOptions: v.selectedOptions
      }))
    };

  } catch (error) {
    console.error('Failed to fetch product:', error);
    return null;
  }
}

// --- Cart Logic ---

const cartFragment = `
  id
  checkoutUrl
  totalQuantity
  cost {
    subtotalAmount {
      amount
      currencyCode
    }
    totalAmount {
      amount
      currencyCode
    }
  }
  lines(first: 100) {
    edges {
      node {
        id
        quantity
        merchandise {
          ... on ProductVariant {
            id
            title
            price {
              amount
              currencyCode
            }
            image {
              url
              altText
            }
            product {
              title
              handle
            }
          }
        }
      }
    }
  }
`;

function formatCart(data: any): Cart {
  return {
    id: data.id,
    checkoutUrl: data.checkoutUrl,
    totalQuantity: data.totalQuantity,
    cost: data.cost,
    lines: data.lines.edges.map(({ node }: any) => ({
      id: node.id,
      quantity: node.quantity,
      merchandise: {
        id: node.merchandise.id,
        title: node.merchandise.title,
        price: node.merchandise.price,
        image: node.merchandise.image,
        product: node.merchandise.product
      }
    }))
  };
}

export async function createCart(): Promise<Cart> {
  const query = `
    mutation cartCreate {
      cartCreate {
        cart {
          ${cartFragment}
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const data = await shopifyFetch<{ cartCreate: { cart: any; userErrors: any[] } }>(query);
  
  if (data.cartCreate.userErrors.length > 0) {
    throw new Error(data.cartCreate.userErrors[0].message);
  }

  return formatCart(data.cartCreate.cart);
}

export async function getCart(cartId: string): Promise<Cart | null> {
  const query = `
    query getCart($cartId: ID!) {
      cart(id: $cartId) {
        ${cartFragment}
      }
    }
  `;

  try {
    const data = await shopifyFetch<{ cart: any }>(query, { cartId });
    if (!data.cart) return null;
    return formatCart(data.cart);
  } catch (error) {
    console.error("Error fetching cart:", error);
    return null;
  }
}

export async function addToCart(cartId: string, variantId: string, quantity: number = 1): Promise<Cart> {
  const query = `
    mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          ${cartFragment}
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const variables = {
    cartId,
    lines: [
      {
        merchandiseId: variantId,
        quantity
      }
    ]
  };

  const data = await shopifyFetch<{ cartLinesAdd: { cart: any; userErrors: any[] } }>(query, variables);

  if (data.cartLinesAdd.userErrors.length > 0) {
    throw new Error(data.cartLinesAdd.userErrors[0].message);
  }

  return formatCart(data.cartLinesAdd.cart);
}

export async function removeFromCart(cartId: string, lineIds: string[]): Promise<Cart> {
  const query = `
    mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          ${cartFragment}
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const data = await shopifyFetch<{ cartLinesRemove: { cart: any; userErrors: any[] } }>(query, { cartId, lineIds });

  if (data.cartLinesRemove.userErrors.length > 0) {
    throw new Error(data.cartLinesRemove.userErrors[0].message);
  }

  return formatCart(data.cartLinesRemove.cart);
}

export async function updateCartLine(cartId: string, lineId: string, quantity: number): Promise<Cart> {
  const query = `
    mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
          ${cartFragment}
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const variables = {
    cartId,
    lines: [
      {
        id: lineId,
        quantity
      }
    ]
  };

  const data = await shopifyFetch<{ cartLinesUpdate: { cart: any; userErrors: any[] } }>(query, variables);

  if (data.cartLinesUpdate.userErrors.length > 0) {
    throw new Error(data.cartLinesUpdate.userErrors[0].message);
  }

  return formatCart(data.cartLinesUpdate.cart);
}

// Deprecated: Keeping for backward compatibility if needed, but redirects to new flow
export async function createCheckout(variantId: string, quantity: number = 1): Promise<string> {
  // This function creates a new cart and returns checkout URL
  // Useful for "Buy Now" buttons that bypass the cart drawer
  const cart = await createCart();
  const updatedCart = await addToCart(cart.id, variantId, quantity);
  return updatedCart.checkoutUrl;
}
