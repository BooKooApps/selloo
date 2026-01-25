const WHOP_API_BASE = 'https://api.whop.com/api/v2';

export interface WhopProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  image_url?: string;
  category_id?: string;
  metadata?: Record<string, any>;
}

export interface WhopCategory {
  id: string;
  name: string;
  description?: string;
  products?: WhopProduct[];
}

export interface WhopStore {
  id: string;
  name: string;
  description: string;
  owner_id: string;
  image_url?: string;
}

export interface WhopAnalytics {
  total_revenue: number;
  total_sales: number;
  total_customers: number;
  revenue_by_period: Array<{ period: string; revenue: number }>;
  sales_by_product: Array<{ product_id: string; product_name: string; sales: number; revenue: number }>;
}

class WhopClient {
  private apiKey: string;
  private appId: string;

  constructor() {
    this.apiKey = process.env.WHOP_API_KEY || '';
    this.appId = process.env.NEXT_PUBLIC_WHOP_APP_ID || '';
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const response = await fetch(`${WHOP_API_BASE}${endpoint}`, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`Whop API error: ${response.statusText}`);
    }

    return response.json();
  }

  async getStore(storeId?: string): Promise<WhopStore> {
    // In a real implementation, you'd fetch from Whop API
    // For now, return mock data structure
    return {
      id: storeId || 'store_123',
      name: 'My Digital Store',
      description: 'Welcome to our digital products store',
      owner_id: 'owner_123',
    };
  }

  async getProducts(storeId?: string): Promise<WhopProduct[]> {
    // Mock data - replace with actual API call
    return [
      // Website and Design Templates (cat_1) - Multiple products for slider testing
      {
        id: 'prod_1',
        name: 'Modern Portfolio Website Template',
        description: 'A sleek and modern portfolio template perfect for designers and creatives. Fully responsive with dark mode support.',
        price: 39.99,
        currency: 'USD',
        category_id: 'cat_1',
      },
      {
        id: 'prod_2',
        name: 'E-Commerce Store Template',
        description: 'Complete e-commerce solution with shopping cart, checkout, and product management. Built with React and Next.js.',
        price: 59.99,
        currency: 'USD',
        category_id: 'cat_1',
      },
      {
        id: 'prod_3',
        name: 'SaaS Landing Page Template',
        description: 'Professional SaaS landing page with pricing tables, features section, and testimonial blocks. Conversion optimized.',
        price: 49.99,
        currency: 'USD',
        category_id: 'cat_1',
      },
      {
        id: 'prod_4',
        name: 'Blog & Magazine Template',
        description: 'Beautiful blog template with article layouts, author pages, and newsletter integration. Perfect for content creators.',
        price: 34.99,
        currency: 'USD',
        category_id: 'cat_1',
      },
      {
        id: 'prod_5',
        name: 'Restaurant & Food Template',
        description: 'Elegant restaurant website template with menu display, reservation system, and gallery. Mobile-first design.',
        price: 44.99,
        currency: 'USD',
        category_id: 'cat_1',
      },
      {
        id: 'prod_6',
        name: 'Corporate Business Template',
        description: 'Professional corporate website template with team section, services, and contact forms. Ideal for businesses.',
        price: 54.99,
        currency: 'USD',
        category_id: 'cat_1',
      },
      {
        id: 'prod_7',
        name: 'Creative Agency Template',
        description: 'Bold and creative agency template with portfolio showcase, case studies, and client testimonials.',
        price: 49.99,
        currency: 'USD',
        category_id: 'cat_1',
      },
      {
        id: 'prod_8',
        name: 'Fitness & Gym Template',
        description: 'Energetic fitness website template with class schedules, trainer profiles, and membership plans.',
        price: 39.99,
        currency: 'USD',
        category_id: 'cat_1',
      },
      {
        id: 'prod_9',
        name: 'Real Estate Template',
        description: 'Professional real estate template with property listings, search filters, and agent profiles.',
        price: 64.99,
        currency: 'USD',
        category_id: 'cat_1',
      },
      {
        id: 'prod_10',
        name: 'Minimalist Portfolio Template',
        description: 'Clean and minimal portfolio template focusing on your work. Perfect for photographers and artists.',
        price: 29.99,
        currency: 'USD',
        category_id: 'cat_1',
      },
      {
        id: 'prod_11',
        name: 'Event & Conference Template',
        description: 'Dynamic event website template with schedule, speaker profiles, and ticket booking system.',
        price: 44.99,
        currency: 'USD',
        category_id: 'cat_1',
      },
      {
        id: 'prod_12',
        name: 'Medical & Healthcare Template',
        description: 'Trustworthy medical website template with appointment booking, doctor profiles, and service pages.',
        price: 54.99,
        currency: 'USD',
        category_id: 'cat_1',
      },
      // Digital Art (cat_2)
      {
        id: 'prod_13',
        name: 'Digital Art Collection',
        description: 'High-quality digital artwork',
        price: 49.99,
        currency: 'USD',
        category_id: 'cat_2',
      },
    ];
  }

  async getCategories(storeId?: string): Promise<WhopCategory[]> {
    // Mock data - replace with actual API call
    return [
      {
        id: 'cat_1',
        name: 'Website and Design Templates',
        description: 'Premium website and design templates',
      },
      {
        id: 'cat_2',
        name: 'Digital Art',
        description: 'Digital artwork and graphics',
      },
    ];
  }

  async getAnalytics(storeId?: string, startDate?: string, endDate?: string): Promise<WhopAnalytics> {
    // Mock data - replace with actual API call
    return {
      total_revenue: 12500.50,
      total_sales: 342,
      total_customers: 287,
      revenue_by_period: [
        { period: '2024-01', revenue: 3200 },
        { period: '2024-02', revenue: 4100 },
        { period: '2024-03', revenue: 5200.50 },
      ],
      sales_by_product: [
        { product_id: 'prod_1', product_name: 'Modern Portfolio Website Template', sales: 85, revenue: 3399.15 },
        { product_id: 'prod_2', product_name: 'E-Commerce Store Template', sales: 120, revenue: 7198.80 },
        { product_id: 'prod_3', product_name: 'SaaS Landing Page Template', sales: 95, revenue: 4749.05 },
        { product_id: 'prod_4', product_name: 'Blog & Magazine Template', sales: 78, revenue: 2729.22 },
        { product_id: 'prod_5', product_name: 'Restaurant & Food Template', sales: 62, revenue: 2789.38 },
        { product_id: 'prod_6', product_name: 'Corporate Business Template', sales: 88, revenue: 4839.12 },
        { product_id: 'prod_7', product_name: 'Creative Agency Template', sales: 72, revenue: 3599.28 },
        { product_id: 'prod_8', product_name: 'Fitness & Gym Template', sales: 55, revenue: 2199.45 },
        { product_id: 'prod_9', product_name: 'Real Estate Template', sales: 45, revenue: 2924.55 },
        { product_id: 'prod_10', product_name: 'Minimalist Portfolio Template', sales: 102, revenue: 3058.98 },
        { product_id: 'prod_11', product_name: 'Event & Conference Template', sales: 38, revenue: 1709.62 },
        { product_id: 'prod_12', product_name: 'Medical & Healthcare Template', sales: 52, revenue: 2859.48 },
        { product_id: 'prod_13', product_name: 'Digital Art Collection', sales: 222, revenue: 11097.78 },
      ],
    };
  }

  async updateStore(storeId: string, data: Partial<WhopStore>): Promise<WhopStore> {
    // Mock implementation
    return { ...await this.getStore(storeId), ...data };
  }

  async createProduct(storeId: string, product: Omit<WhopProduct, 'id'>): Promise<WhopProduct> {
    // Mock implementation
    return { ...product, id: `prod_${Date.now()}` };
  }

  async updateProduct(productId: string, data: Partial<WhopProduct>): Promise<WhopProduct> {
    // Mock implementation
    const products = await this.getProducts();
    const product = products.find(p => p.id === productId);
    if (!product) throw new Error('Product not found');
    return { ...product, ...data };
  }

  async deleteProduct(productId: string): Promise<void> {
    // Mock implementation
  }

  async createCategory(storeId: string, category: Omit<WhopCategory, 'id' | 'products'>): Promise<WhopCategory> {
    // Mock implementation
    return { ...category, id: `cat_${Date.now()}`, products: [] };
  }

  async updateCategory(categoryId: string, data: Partial<WhopCategory>): Promise<WhopCategory> {
    // Mock implementation
    const categories = await this.getCategories();
    const category = categories.find(c => c.id === categoryId);
    if (!category) throw new Error('Category not found');
    return { ...category, ...data };
  }

  async deleteCategory(categoryId: string): Promise<void> {
    // Mock implementation
  }
}

export const whopClient = new WhopClient();
