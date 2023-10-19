import Web3, { Contract, ContractAbi } from "web3";

export type SwapInfo = {
  swapAddress: string;
  swapAmount: number;
  explorURL: string;
};

export type Account = {
  address: string;
  balance: number;
};

export type WalletConnection = {
  isWalletConnected: boolean;
  chainId: string;
  web3: Web3 | null;
};

export enum ErrorType {
  NoError,
  NotInstalled,
  CannotSwitchNetwork,
  CannotAddNetwork,
  NotConnected,
  InvalidNetwork,
  NoAccounts,
  InvalidAmount,
  InvalidAddress,
  ZeroBalance,
  InsufficientBalance,
  DepositFailed,
}

export type ErrorMessage = {
  type: ErrorType;
  message: string;
};

export type Network = {
  chainId: string;
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcUrls: string[];
  blockExplorerUrls: string[];
};

export type BerithSwapContract = {
  instance: Contract<ContractAbi> | null;
  address: string;
};
