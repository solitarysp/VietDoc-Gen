import React, { forwardRef } from 'react';
import { DocumentData } from '../types';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

interface DocumentPreviewProps {
  data: DocumentData;
}

const DocumentPreview = forwardRef<HTMLDivElement, DocumentPreviewProps>(({ data }, ref) => {
  const formattedDate = format(data.date, "'ngày' dd 'tháng' MM 'năm' yyyy", { locale: vi });
  const formatId = data.formatId || 1;

  // Format Styles Configuration
  const getFormatStyles = (id: number) => {
    switch (id) {
      case 2: // Bordered
        return {
          container: 'font-serif text-[11pt] leading-relaxed border-4 border-double border-black p-16',
          header: 'flex justify-between items-start mb-8',
          companyAlign: 'text-center',
          mottoAlign: 'text-center',
          titleAlign: 'text-center',
          fontFamily: '"Times New Roman", serif',
          headerTitleClass: 'font-bold text-[11pt]',
          headerSubtitleClass: 'font-bold text-[12pt]'
        };
      case 3: // Modern Sans
        return {
          container: 'font-sans text-[10pt] leading-relaxed p-12',
          header: 'flex justify-between items-start mb-10 border-b-2 border-gray-800 pb-4',
          companyAlign: 'text-left',
          mottoAlign: 'text-right',
          titleAlign: 'text-left',
          fontFamily: 'Arial, Helvetica, sans-serif',
          headerTitleClass: 'font-bold text-[11pt]',
          headerSubtitleClass: 'font-bold text-[11pt]'
        };
      case 4: // Classic Centered
        return {
          container: 'font-serif text-[12pt] leading-loose p-12',
          header: 'flex flex-col items-center mb-8 gap-4',
          companyAlign: 'text-center w-full',
          mottoAlign: 'text-center w-full',
          titleAlign: 'text-center',
          fontFamily: '"Times New Roman", serif',
          headerTitleClass: 'font-bold text-[13pt]',
          headerSubtitleClass: 'font-bold text-[13pt]'
        };
      case 5: // Bold / Heavy
        return {
          container: 'font-serif text-[11pt] leading-relaxed p-12',
          header: 'flex justify-between items-start mb-8',
          companyAlign: 'text-center font-black',
          mottoAlign: 'text-center font-black',
          titleAlign: 'text-center uppercase tracking-widest',
          fontFamily: '"Times New Roman", serif',
          headerTitleClass: 'font-black text-[12pt]',
          headerSubtitleClass: 'font-black text-[12pt]'
        };
      default: // Standard (Format 1)
        return {
          container: 'font-serif text-[11pt] leading-relaxed p-12',
          header: 'flex justify-between items-start mb-8',
          companyAlign: 'text-center',
          mottoAlign: 'text-center',
          titleAlign: 'text-center',
          fontFamily: '"Times New Roman", serif',
          headerTitleClass: 'font-bold text-[11pt]',
          headerSubtitleClass: 'font-bold text-[12pt]'
        };
    }
  };

  const styles = getFormatStyles(formatId);

  return (
    <div 
      ref={ref} 
      className={`bg-white text-black shadow-lg mx-auto relative ${styles.container}`}
      style={{ 
        width: '210mm', 
        minHeight: '297mm',
        boxSizing: 'border-box',
        fontFamily: styles.fontFamily
      }}
    >
      {/* Header */}
      <div className={styles.header}>
        <div className={`${styles.companyAlign} ${formatId === 4 ? 'w-full' : 'w-5/12'}`}>
          <div className={`uppercase ${styles.headerTitleClass}`}>{data.companyName}</div>
          <div className={`uppercase ${styles.headerTitleClass} border-b border-black pb-1 inline-block mb-1`}>{data.department}</div>
          <div className="italic text-[11pt]">Số: {data.documentNumber}</div>
        </div>
        <div className={`${styles.mottoAlign} ${formatId === 4 ? 'w-full' : 'w-6/12'}`}>
          <div className={`uppercase ${styles.headerTitleClass}`}>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</div>
          <div className={`${styles.headerSubtitleClass} border-b border-black pb-1 inline-block mb-1 ${formatId === 5 ? 'border-b-2' : ''}`}>Độc lập - Tự do - Hạnh phúc</div>
          <div className="italic text-[11pt] mt-1">{data.location}, {formattedDate}</div>
        </div>
      </div>

      {/* Title */}
      <div className={`${styles.titleAlign} mb-8 mt-8`}>
        <h1 className={`${formatId === 5 ? 'font-black text-3xl' : 'font-bold text-2xl'} uppercase mb-2`}>
          {data.type === 'giay-cong-tac' && 'GIẤY ĐI ĐƯỜNG'}
          {data.type === 'giay-gioi-thieu' && 'GIẤY GIỚI THIỆU'}
          {data.type === 'giay-xac-nhan' && 'GIẤY XÁC NHẬN CÔNG TÁC'}
          {data.type === 'giay-nghi-phep' && 'ĐƠN XIN NGHỈ PHÉP'}
          {data.type === 'giay-de-nghi-tam-ung' && 'GIẤY ĐỀ NGHỊ TẠM ỨNG'}
          {data.type === 'giay-de-nghi-thanh-toan' && 'GIẤY ĐỀ NGHỊ THANH TOÁN'}
          {data.type === 'bien-ban-ban-giao' && 'BIÊN BẢN BÀN GIAO'}
          {data.type === 'giay-cu-di-cong-tac' && 'QUYẾT ĐỊNH CỬ ĐI CÔNG TÁC'}
          {data.type === 'giay-yeu-cau-truc' && 'GIẤY YÊU CẦU TRỰC'}
        </h1>
        {data.showKinhGui && (
          <div className="italic">Kính gửi: ........................................................................</div>
        )}
      </div>

      {/* Content */}
      <div className="space-y-4 px-4">
        {data.type === 'giay-cong-tac' && (
          <>
            <div className="flex items-baseline">
              <span className="min-w-[150px]">1. Cấp cho ông/bà:</span>
              <span className="font-bold uppercase flex-1 border-b border-dotted border-black pl-2">{data.fullName}</span>
            </div>
            <div className="flex items-baseline">
              <span className="min-w-[150px]">Chức vụ:</span>
              <span className="flex-1 border-b border-dotted border-black pl-2">{data.position}</span>
            </div>
            <div className="flex items-baseline">
              <span className="min-w-[150px]">Được cử đi công tác tại:</span>
              <span className="flex-1 border-b border-dotted border-black pl-2">{data.destination}</span>
            </div>
            <div className="flex items-baseline">
              <span className="min-w-[150px]">Về việc:</span>
              <span className="flex-1 border-b border-dotted border-black pl-2">{data.reason}</span>
            </div>
            <div className="flex items-baseline">
              <span className="min-w-[150px]">Thời gian:</span>
              <span className="flex-1 border-b border-dotted border-black pl-2">Từ ngày {data.durationFrom} đến ngày {data.durationTo}</span>
            </div>
            <div className="flex items-baseline">
              <span className="min-w-[150px]">Phương tiện:</span>
              <span className="flex-1 border-b border-dotted border-black pl-2">Tự túc / Xe công ty</span>
            </div>
          </>
        )}

        {data.type === 'giay-gioi-thieu' && (
          <>
            <div className="mb-4 text-justify indent-8">
              Trân trọng giới thiệu ông/bà: <span className="font-bold uppercase">{data.fullName}</span>
            </div>
            <div className="flex items-baseline">
              <span className="min-w-[150px]">Chức vụ:</span>
              <span className="flex-1 border-b border-dotted border-black pl-2">{data.position}</span>
            </div>
             <div className="flex items-baseline">
              <span className="min-w-[150px]">CMND/CCCD số:</span>
              <span className="flex-1 border-b border-dotted border-black pl-2">{data.idCard}</span>
            </div>
             <div className="flex items-baseline">
              <span className="min-w-[150px]">Cấp ngày:</span>
              <span className="flex-1 border-b border-dotted border-black pl-2">{data.idDate} tại {data.idPlace}</span>
            </div>
            <div className="flex items-baseline mt-4">
              <span className="min-w-[150px]">Được cử đến:</span>
              <span className="flex-1 border-b border-dotted border-black pl-2">{data.destination}</span>
            </div>
            <div className="flex items-baseline">
              <span className="min-w-[150px]">Về việc:</span>
              <span className="flex-1 border-b border-dotted border-black pl-2">{data.reason}</span>
            </div>
             <div className="mt-4 italic text-[11pt]">
              Giấy giới thiệu có giá trị đến hết ngày: {data.durationTo}
            </div>
          </>
        )}

        {data.type === 'giay-xac-nhan' && (
          <>
            <div className="mb-4 text-justify indent-8">
              Tôi tên là: <span className="font-bold uppercase">{data.fullName}</span>
            </div>
            <div className="flex items-baseline">
              <span className="min-w-[150px]">Chức vụ:</span>
              <span className="flex-1 border-b border-dotted border-black pl-2">{data.position}</span>
            </div>
            <div className="flex items-baseline">
              <span className="min-w-[150px]">Đơn vị công tác:</span>
              <span className="flex-1 border-b border-dotted border-black pl-2">{data.department} - {data.companyName}</span>
            </div>
            <div className="flex items-baseline mt-4">
              <span className="min-w-[150px]">Nay xác nhận:</span>
              <span className="flex-1 border-b border-dotted border-black pl-2">Ông/Bà {data.fullName} đang công tác tại đơn vị.</span>
            </div>
            <div className="flex items-baseline">
              <span className="min-w-[150px]">Lý do xác nhận:</span>
              <span className="flex-1 border-b border-dotted border-black pl-2">{data.reason}</span>
            </div>
            <div className="flex items-baseline">
              <span className="min-w-[150px]">Nơi nhận:</span>
              <span className="flex-1 border-b border-dotted border-black pl-2">{data.destination}</span>
            </div>
          </>
        )}

        {data.type === 'giay-nghi-phep' && (
          <>
            <div className="mb-4 text-justify indent-8">
              Tôi tên là: <span className="font-bold uppercase">{data.fullName}</span>
            </div>
            <div className="flex items-baseline">
              <span className="min-w-[150px]">Chức vụ:</span>
              <span className="flex-1 border-b border-dotted border-black pl-2">{data.position}</span>
            </div>
            <div className="flex items-baseline">
              <span className="min-w-[150px]">Bộ phận:</span>
              <span className="flex-1 border-b border-dotted border-black pl-2">{data.department}</span>
            </div>
            <div className="flex items-baseline mt-4">
              <span className="min-w-[150px]">Xin nghỉ phép từ:</span>
              <span className="flex-1 border-b border-dotted border-black pl-2">{data.durationFrom} đến {data.durationTo}</span>
            </div>
            <div className="flex items-baseline">
              <span className="min-w-[150px]">Lý do nghỉ:</span>
              <span className="flex-1 border-b border-dotted border-black pl-2">{data.reason}</span>
            </div>
            <div className="flex items-baseline">
              <span className="min-w-[150px]">Nơi nghỉ:</span>
              <span className="flex-1 border-b border-dotted border-black pl-2">{data.destination}</span>
            </div>
          </>
        )}

        {data.type === 'giay-de-nghi-tam-ung' && (
          <>
            <div className="mb-4 text-justify indent-8">
              Tôi tên là: <span className="font-bold uppercase">{data.fullName}</span>
            </div>
            <div className="flex items-baseline">
              <span className="min-w-[150px]">Chức vụ:</span>
              <span className="flex-1 border-b border-dotted border-black pl-2">{data.position}</span>
            </div>
            <div className="flex items-baseline">
              <span className="min-w-[150px]">Bộ phận:</span>
              <span className="flex-1 border-b border-dotted border-black pl-2">{data.department}</span>
            </div>
            <div className="flex items-baseline mt-4">
              <span className="min-w-[150px]">Đề nghị tạm ứng số tiền:</span>
              <span className="flex-1 border-b border-dotted border-black pl-2 font-bold">{data.amount} VNĐ</span>
            </div>
            <div className="flex items-baseline">
              <span className="min-w-[150px]">Bằng chữ:</span>
              <span className="flex-1 border-b border-dotted border-black pl-2 italic">{data.amountInWords}</span>
            </div>
            <div className="flex items-baseline">
              <span className="min-w-[150px]">Lý do tạm ứng:</span>
              <span className="flex-1 border-b border-dotted border-black pl-2">{data.reason}</span>
            </div>
            <div className="flex items-baseline">
              <span className="min-w-[150px]">Thời hạn thanh toán:</span>
              <span className="flex-1 border-b border-dotted border-black pl-2">{data.durationTo}</span>
            </div>
          </>
        )}

        {data.type === 'giay-de-nghi-thanh-toan' && (
          <>
            <div className="mb-4 text-justify indent-8">
              Tôi tên là: <span className="font-bold uppercase">{data.fullName}</span>
            </div>
            <div className="flex items-baseline">
              <span className="min-w-[150px]">Chức vụ:</span>
              <span className="flex-1 border-b border-dotted border-black pl-2">{data.position}</span>
            </div>
            <div className="flex items-baseline">
              <span className="min-w-[150px]">Bộ phận:</span>
              <span className="flex-1 border-b border-dotted border-black pl-2">{data.department}</span>
            </div>
            <div className="flex items-baseline mt-4">
              <span className="min-w-[150px]">Đề nghị thanh toán số tiền:</span>
              <span className="flex-1 border-b border-dotted border-black pl-2 font-bold">{data.amount} VNĐ</span>
            </div>
            <div className="flex items-baseline">
              <span className="min-w-[150px]">Bằng chữ:</span>
              <span className="flex-1 border-b border-dotted border-black pl-2 italic">{data.amountInWords}</span>
            </div>
            <div className="flex items-baseline">
              <span className="min-w-[150px]">Nội dung thanh toán:</span>
              <span className="flex-1 border-b border-dotted border-black pl-2">{data.reason}</span>
            </div>
            <div className="flex items-baseline">
              <span className="min-w-[150px]">Kèm theo chứng từ gốc:</span>
              <span className="flex-1 border-b border-dotted border-black pl-2">..........................................................</span>
            </div>
          </>
        )}

        {data.type === 'bien-ban-ban-giao' && (
          <>
            <div className="mb-4 font-bold">I. BÊN GIAO:</div>
            <div className="flex items-baseline">
              <span className="min-w-[150px]">Ông/Bà:</span>
              <span className="flex-1 border-b border-dotted border-black pl-2 font-bold uppercase">{data.fullName}</span>
            </div>
            <div className="flex items-baseline">
              <span className="min-w-[150px]">Chức vụ:</span>
              <span className="flex-1 border-b border-dotted border-black pl-2">{data.position}</span>
            </div>
            <div className="flex items-baseline">
              <span className="min-w-[150px]">Bộ phận:</span>
              <span className="flex-1 border-b border-dotted border-black pl-2">{data.department}</span>
            </div>

            <div className="mb-4 mt-6 font-bold">II. BÊN NHẬN:</div>
            <div className="flex items-baseline">
              <span className="min-w-[150px]">Ông/Bà:</span>
              <span className="flex-1 border-b border-dotted border-black pl-2 font-bold uppercase">{data.destination}</span>
            </div>
            <div className="flex items-baseline">
              <span className="min-w-[150px]">Bộ phận:</span>
              <span className="flex-1 border-b border-dotted border-black pl-2">........................................................................</span>
            </div>

            <div className="mb-4 mt-6 font-bold">III. NỘI DUNG BÀN GIAO:</div>
            <div className="border border-black p-4 min-h-[150px]">
              <p>{data.reason}</p>
            </div>
          </>
        )}

        {data.type === 'giay-cu-di-cong-tac' && (
          <>
            <div className="mb-4 text-justify indent-8">
              Căn cứ vào nhu cầu công tác, Giám đốc Công ty quyết định cử cán bộ đi công tác như sau:
            </div>
            <div className="flex items-baseline">
              <span className="min-w-[150px]">1. Ông/Bà:</span>
              <span className="flex-1 border-b border-dotted border-black pl-2 font-bold uppercase">{data.fullName}</span>
            </div>
            <div className="flex items-baseline">
              <span className="min-w-[150px]">Chức vụ:</span>
              <span className="flex-1 border-b border-dotted border-black pl-2">{data.position}</span>
            </div>
            <div className="flex items-baseline">
              <span className="min-w-[150px]">Bộ phận:</span>
              <span className="flex-1 border-b border-dotted border-black pl-2">{data.department}</span>
            </div>
            <div className="flex items-baseline mt-4">
              <span className="min-w-[150px]">2. Nơi đến công tác:</span>
              <span className="flex-1 border-b border-dotted border-black pl-2">{data.destination}</span>
            </div>
            <div className="flex items-baseline">
              <span className="min-w-[150px]">3. Về việc:</span>
              <span className="flex-1 border-b border-dotted border-black pl-2">{data.reason}</span>
            </div>
            <div className="flex items-baseline">
              <span className="min-w-[150px]">4. Thời gian:</span>
              <span className="flex-1 border-b border-dotted border-black pl-2">Từ ngày {data.durationFrom} đến ngày {data.durationTo}</span>
            </div>
            <div className="flex items-baseline">
              <span className="min-w-[150px]">5. Phương tiện:</span>
              <span className="flex-1 border-b border-dotted border-black pl-2">Theo quy định của công ty</span>
            </div>
            <div className="flex items-baseline">
              <span className="min-w-[150px]">6. Kinh phí:</span>
              <span className="flex-1 border-b border-dotted border-black pl-2">Theo quy chế công tác phí hiện hành</span>
            </div>
          </>
        )}

        {data.type === 'giay-yeu-cau-truc' && (
          <>
            <div className="mb-4 text-justify indent-8">
              Theo yêu cầu công việc, Phòng/Ban đề nghị bố trí nhân sự trực như sau:
            </div>
            <div className="flex items-baseline">
              <span className="min-w-[150px]">Họ và tên:</span>
              <span className="flex-1 border-b border-dotted border-black pl-2 font-bold uppercase">{data.fullName}</span>
            </div>
            <div className="flex items-baseline">
              <span className="min-w-[150px]">Chức vụ:</span>
              <span className="flex-1 border-b border-dotted border-black pl-2">{data.position}</span>
            </div>
            <div className="flex items-baseline">
              <span className="min-w-[150px]">Bộ phận:</span>
              <span className="flex-1 border-b border-dotted border-black pl-2">{data.department}</span>
            </div>
            <div className="flex items-baseline mt-4">
              <span className="min-w-[150px]">Thời gian trực:</span>
              <span className="flex-1 border-b border-dotted border-black pl-2">{data.durationFrom}</span>
            </div>
            <div className="flex items-baseline">
              <span className="min-w-[150px]">Ca trực:</span>
              <span className="flex-1 border-b border-dotted border-black pl-2">{data.durationTo}</span>
            </div>
            <div className="flex items-baseline">
              <span className="min-w-[150px]">Địa điểm:</span>
              <span className="flex-1 border-b border-dotted border-black pl-2">{data.destination}</span>
            </div>
            <div className="flex items-baseline">
              <span className="min-w-[150px]">Nội dung công việc:</span>
              <span className="flex-1 border-b border-dotted border-black pl-2">{data.reason}</span>
            </div>
          </>
        )}
      </div>

      {/* Signatures */}
      <div className="flex justify-between mt-16 px-4">
        {data.type === 'giay-cong-tac' ? (
           <>
            <div className="text-center w-1/3">
              <div className="font-bold uppercase mb-16">Người đi đường</div>
              <div className="font-bold">{data.fullName}</div>
            </div>
            <div className="text-center w-1/3">
              <div className="font-bold uppercase mb-16">Phụ trách bộ phận</div>
              <div className="font-bold">(Ký, họ tên)</div>
            </div>
             <div className="text-center w-1/3 relative">
              <div className="font-bold uppercase mb-4">{data.signerTitle}</div>
              
              <div className="relative h-48 w-full flex justify-center items-center">
                 {/* Signature - Placed first */}
                 {data.showSignature && (
                   <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 font-signature text-blue-900 text-5xl z-10 whitespace-nowrap" style={{ transform: 'translate(-50%, 0) rotate(-5deg)' }}>
                      {data.signerName.split(' ').pop()}
                   </div>
                 )}

                 {/* Seal - Overlapping left side of signature */}
                 {data.showSeal && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-[65%] text-red-600 opacity-90 mix-blend-multiply z-20 pointer-events-none">
                      <svg width="170" height="170" viewBox="0 0 170 170" className="rotate-[-15deg]">
                        <defs>
                          <path id="curve-top" d="M 27, 85 A 58, 58 0 1, 1 143, 85" fill="none" />
                          <path id="curve-bottom" d="M 27, 85 A 58, 58 0 0, 0 143, 85" fill="none" />
                        </defs>
                        
                        {/* Circle 1: Outer (Thick) */}
                        <circle cx="85" cy="85" r="80" fill="none" stroke="currentColor" strokeWidth="5" />
                        
                        {/* Circle 2: Middle (Thin) */}
                        <circle cx="85" cy="85" r="70" fill="none" stroke="currentColor" strokeWidth="1" />
                        
                        {/* Circle 3: Inner (Thin) */}
                        <circle cx="85" cy="85" r="46" fill="none" stroke="currentColor" strokeWidth="1" />
                        
                        {/* Stars */}
                        <g transform="translate(27, 85)">
                           <text fontSize="14" fill="currentColor" textAnchor="middle" dominantBaseline="middle">★</text>
                        </g>
                        <g transform="translate(143, 85)">
                           <text fontSize="14" fill="currentColor" textAnchor="middle" dominantBaseline="middle">★</text>
                        </g>

                        {/* Top Text: MSDN */}
                        <text fontSize="13" fontWeight="bold" fontFamily="Arial, sans-serif" fill="currentColor" textAnchor="middle" letterSpacing="0.5" dominantBaseline="middle">
                          <textPath href="#curve-top" startOffset="50%" side="left" method="align">
                            M.S.D.N: {data.taxCode}
                          </textPath>
                        </text>

                        {/* Bottom Text: Location */}
                        <text fontSize="13" fontWeight="bold" fontFamily="Arial, sans-serif" fill="currentColor" textAnchor="middle" letterSpacing="0.5" dominantBaseline="middle">
                           <textPath href="#curve-bottom" startOffset="50%" side="left" method="align">
                             T. {data.location.toUpperCase()}
                           </textPath>
                        </text>

                        {/* Center Text: Company Name */}
                        <foreignObject x="40" y="40" width="90" height="90">
                          <div className="w-full h-full flex items-center justify-center text-center px-1">
                            <p className="text-red-600 font-bold uppercase text-[11px] leading-tight font-serif" style={{ wordBreak: 'break-word', fontFamily: '"Times New Roman", serif' }}>
                              {data.companyName}
                            </p>
                          </div>
                        </foreignObject>
                      </svg>
                    </div>
                 )}
              </div>
              
              <div className="font-bold uppercase mt-1 relative z-30">{data.signerName}</div>
            </div>
           </>
        ) : (
           <>
             <div className="w-1/2"></div>
             <div className="text-center w-1/2 relative">
              <div className="font-bold uppercase mb-4">{data.signerTitle}</div>
              
              <div className="relative h-48 w-full flex justify-center items-center">
                 {/* Signature */}
                 {data.showSignature && (
                   <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 font-signature text-blue-900 text-5xl z-10 whitespace-nowrap" style={{ transform: 'translate(-50%, 0) rotate(-5deg)' }}>
                      {data.signerName.split(' ').pop()}
                   </div>
                 )}

                 {/* Seal */}
                 {data.showSeal && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-[65%] text-red-600 opacity-90 mix-blend-multiply z-20 pointer-events-none">
                      <svg width="170" height="170" viewBox="0 0 170 170" className="rotate-[-15deg]">
                        <defs>
                          <path id="curve-top-2" d="M 27, 85 A 58, 58 0 1, 1 143, 85" fill="none" />
                          <path id="curve-bottom-2" d="M 27, 85 A 58, 58 0 0, 0 143, 85" fill="none" />
                        </defs>
                        
                        {/* Circle 1: Outer (Thick) */}
                        <circle cx="85" cy="85" r="80" fill="none" stroke="currentColor" strokeWidth="5" />
                        
                        {/* Circle 2: Middle (Thin) */}
                        <circle cx="85" cy="85" r="70" fill="none" stroke="currentColor" strokeWidth="1" />
                        
                        {/* Circle 3: Inner (Thin) */}
                        <circle cx="85" cy="85" r="46" fill="none" stroke="currentColor" strokeWidth="1" />
                        
                        {/* Stars */}
                        <g transform="translate(27, 85)">
                           <text fontSize="14" fill="currentColor" textAnchor="middle" dominantBaseline="middle">★</text>
                        </g>
                        <g transform="translate(143, 85)">
                           <text fontSize="14" fill="currentColor" textAnchor="middle" dominantBaseline="middle">★</text>
                        </g>

                        {/* Top Text: MSDN */}
                        <text fontSize="13" fontWeight="bold" fontFamily="Arial, sans-serif" fill="currentColor" textAnchor="middle" letterSpacing="0.5" dominantBaseline="middle">
                          <textPath href="#curve-top-2" startOffset="50%" side="left" method="align">
                            M.S.D.N: {data.taxCode}
                          </textPath>
                        </text>

                        {/* Bottom Text: Location */}
                        <text fontSize="13" fontWeight="bold" fontFamily="Arial, sans-serif" fill="currentColor" textAnchor="middle" letterSpacing="0.5" dominantBaseline="middle">
                           <textPath href="#curve-bottom-2" startOffset="50%" side="left" method="align">
                             T. {data.location.toUpperCase()}
                           </textPath>
                        </text>

                        {/* Center Text: Company Name */}
                        <foreignObject x="40" y="40" width="90" height="90">
                          <div className="w-full h-full flex items-center justify-center text-center px-1">
                            <p className="text-red-600 font-bold uppercase text-[11px] leading-tight font-serif" style={{ wordBreak: 'break-word', fontFamily: '"Times New Roman", serif' }}>
                              {data.companyName}
                            </p>
                          </div>
                        </foreignObject>
                      </svg>
                    </div>
                 )}
              </div>
              
              <div className="font-bold uppercase mt-1 relative z-30">{data.signerName}</div>
            </div>
           </>
        )}
      </div>
      
      {/* Footer Note */}
      <div className="absolute bottom-12 left-12 text-xs italic text-gray-400">
        * Văn bản được tạo tự động từ hệ thống VietDoc Gen.
      </div>
    </div>
  );
});

DocumentPreview.displayName = 'DocumentPreview';

export default DocumentPreview;
