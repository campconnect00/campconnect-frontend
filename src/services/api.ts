import axios, { AxiosInstance } from 'axios';

class APIService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        // Add auth token if available
        const token = localStorage.getItem('auth_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Handle unauthorized
          localStorage.removeItem('auth_token');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // Inventory
  async getInventory(campId?: string) {
    if (campId) {
      const response = await this.client.get(`/camps/${campId}/inventory`);
      return response.data;
    }
    const response = await this.client.get('/inventory');
    return response.data;
  }

  async createInventory(data: any) {
    const response = await this.client.post('/inventory', data);
    return response.data;
  }

  async updateInventory(id: string, data: any) {
    const response = await this.client.patch(`/inventory/${id}`, data);
    return response.data;
  }

  async updateInventoryItem(campId: string, itemId: string, data: any) {
    const response = await this.client.patch(
      `/camps/${campId}/inventory/${itemId}`,
      data
    );
    return response.data;
  }

  // Vendors
  async getSuppliers(campId?: string, filters?: any) {
    if (campId) {
      const response = await this.client.get(`/camps/${campId}/vendors`, {
        params: filters,
      });
      return response.data;
    }
    const response = await this.client.get('/suppliers', { params: filters });
    return response.data;
  }

  async getVendors(campId: string, filters?: any) {
    const response = await this.client.get(`/camps/${campId}/vendors`, {
      params: filters,
    });
    return response.data;
  }

  async updateSupplier(id: string, data: any) {
    const response = await this.client.patch(`/suppliers/${id}`, data);
    return response.data;
  }

  async getVendorById(vendorId: string) {
    const response = await this.client.get(`/vendors/${vendorId}`);
    return response.data;
  }

  // Orders
  async createOrder(campId: string, orderData: any) {
    const response = await this.client.post(`/camps/${campId}/orders`, orderData);
    return response.data;
  }

  async getOrders(campId: string, filters?: any) {
    const response = await this.client.get(`/camps/${campId}/orders`, {
      params: filters,
    });
    return response.data;
  }

  // Agent Decisions
  async getAgentRecommendations(campId: string) {
    const response = await this.client.get(`/camps/${campId}/agents/recommendations`);
    return response.data;
  }

  async approveAgentRecommendation(recommendationId: string) {
    const response = await this.client.post(
      `/agents/recommendations/${recommendationId}/approve`
    );
    return response.data;
  }

  // Impact Metrics
  async getCarbonImpact(campId: string, period: string) {
    const response = await this.client.get(`/camps/${campId}/impact/carbon`, {
      params: { period },
    });
    return response.data;
  }

  async getEconomicImpact(campId: string, period: string) {
    const response = await this.client.get(`/camps/${campId}/impact/economic`, {
      params: { period },
    });
    return response.data;
  }

  // Generic methods for direct axios usage
  async get(url: string, config?: any) {
    return await this.client.get(url, config);
  }

  async post(url: string, data?: any, config?: any) {
    return await this.client.post(url, data, config);
  }

  async put(url: string, data?: any, config?: any) {
    return await this.client.put(url, data, config);
  }

  async patch(url: string, data?: any, config?: any) {
    return await this.client.patch(url, data, config);
  }

  async delete(url: string, config?: any) {
    return await this.client.delete(url, config);
  }
}

export const api = new APIService();