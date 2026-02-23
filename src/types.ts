export type DocumentType = 
  | 'giay-cong-tac' 
  | 'giay-gioi-thieu' 
  | 'giay-xac-nhan' 
  | 'giay-nghi-phep'
  | 'giay-de-nghi-tam-ung'
  | 'giay-de-nghi-thanh-toan'
  | 'bien-ban-ban-giao'
  | 'giay-cu-di-cong-tac'
  | 'giay-yeu-cau-truc';

export interface DocumentData {
  type: DocumentType;
  companyName: string;
  department: string;
  documentNumber: string;
  location: string;
  date: Date;
  taxCode: string;
  
  // Personal Info
  fullName: string;
  position: string;
  idCard: string;
  idDate: string;
  idPlace: string;
  
  // Content specific
  reason: string;
  destination: string; // For travel/intro
  durationFrom: string;
  durationTo: string;
  
  // Money related
  amount?: string;
  amountInWords?: string;
  
  // Signer Info
  signerName: string;
  signerTitle: string; // GIÁM ĐỐC, TRƯỞNG PHÒNG...
  
  // Seal
  showSeal: boolean;
  showSignature: boolean;
  sealText: string; // Text on the seal (usually company name)
  
  // Format
  formatId: number;
  
  // Options
  showKinhGui: boolean;
}

export const initialData: DocumentData = {
  type: 'giay-cong-tac',
  companyName: 'CÔNG TY TNHH MTV GIẢI PHÁP CÔNG NGHỆ SỐ',
  department: 'PHÒNG KỸ THUẬT',
  documentNumber: '123/GCT-CNS',
  location: 'Hà Nội',
  date: new Date(),
  taxCode: '0101234567',
  fullName: 'Nguyễn Văn A',
  position: 'Nhân viên kỹ thuật',
  idCard: '0123456789',
  idDate: '01/01/2020',
  idPlace: 'Cục Cảnh sát QLHC về TTXH',
  reason: 'Tham gia triển khai dự án phần mềm quản lý kho',
  destination: 'Chi nhánh Hồ Chí Minh - Quận 1',
  durationFrom: '20/10/2023',
  durationTo: '25/10/2023',
  amount: '5.000.000',
  amountInWords: 'Năm triệu đồng chẵn',
  signerName: 'Trần Văn B',
  signerTitle: 'GIÁM ĐỐC',
  showSeal: true,
  showSignature: true,
  sealText: 'CÔNG TY TNHH MTV GIẢI PHÁP CÔNG NGHỆ SỐ',
  formatId: 1,
  showKinhGui: true,
};
