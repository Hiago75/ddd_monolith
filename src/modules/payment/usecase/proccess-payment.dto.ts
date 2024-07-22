export interface ProccessPaymentInputDto {
  amount: number;
  orderId: string;
}

export interface ProccessPaymentOutputDto {
  transactionId: string;
  orderId: string;
  amount: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}