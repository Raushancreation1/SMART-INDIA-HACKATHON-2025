import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Contract {
  id: string;
  farmerId: string;
  buyerId: string;
  cropType: string;
  quantity: number;
  unit: string;
  pricePerUnit: number;
  totalPrice: number;
  status: 'pending' | 'active' | 'completed' | 'cancelled' | 'disputed';
  startDate: string;
  endDate: string;
  deliveryDate: string;
  paymentStatus: 'pending' | 'partial' | 'completed';
  deliveryAddress: string;
  terms: string;
  createdAt: string;
  updatedAt: string;
  farmerName?: string;
  buyerName?: string;
}

interface ContractState {
  contracts: Contract[];
  selectedContract: Contract | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: ContractState = {
  contracts: [],
  selectedContract: null,
  isLoading: false,
  error: null,
};

const contractSlice = createSlice({
  name: 'contracts',
  initialState,
  reducers: {
    fetchContractsStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchContractsSuccess: (state, action: PayloadAction<Contract[]>) => {
      state.isLoading = false;
      state.contracts = action.payload;
    },
    fetchContractsFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    createContractStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    createContractSuccess: (state, action: PayloadAction<Contract>) => {
      state.isLoading = false;
      state.contracts.push(action.payload);
    },
    createContractFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateContractStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    updateContractSuccess: (state, action: PayloadAction<Contract>) => {
      state.isLoading = false;
      const index = state.contracts.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        state.contracts[index] = action.payload;
      }
    },
    updateContractFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    selectContract: (state, action: PayloadAction<Contract | null>) => {
      state.selectedContract = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  fetchContractsStart,
  fetchContractsSuccess,
  fetchContractsFailure,
  createContractStart,
  createContractSuccess,
  createContractFailure,
  updateContractStart,
  updateContractSuccess,
  updateContractFailure,
  selectContract,
  clearError,
} = contractSlice.actions;

export default contractSlice.reducer;
