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
    const base = {
      container: 'font-serif text-[11pt] leading-relaxed p-12',
      header: 'flex justify-between items-start mb-8',
      companyAlign: 'text-center',
      mottoAlign: 'text-center',
      titleAlign: 'text-center',
      fontFamily: '"Times New Roman", serif',
      headerTitleClass: 'font-bold text-[11pt]',
      headerSubtitleClass: 'font-bold text-[12pt]',
      companyWidthClass: 'w-5/12',
      mottoWidthClass: 'w-6/12',
      titleClass: 'font-bold text-2xl',
      headerSubtitleBorderClass: 'border-b border-black'
    };

    switch (id) {
      case 2: // Bordered
        return {
          ...base,
          container: 'font-serif text-[11pt] leading-relaxed border-4 border-double border-black p-16'
        };
      case 3: // Modern Sans
        return {
          ...base,
          container: 'font-sans text-[10pt] leading-relaxed p-12',
          header: 'flex justify-between items-start mb-10 border-b-2 border-gray-800 pb-4',
          companyAlign: 'text-left',
          mottoAlign: 'text-right',
          titleAlign: 'text-left',
          fontFamily: 'Arial, Helvetica, sans-serif',
          headerSubtitleClass: 'font-bold text-[11pt]'
        };
      case 4: // Classic Centered
        return {
          ...base,
          container: 'font-serif text-[12pt] leading-loose p-12',
          header: 'flex flex-col items-center mb-8 gap-4',
          companyAlign: 'text-center',
          mottoAlign: 'text-center',
          companyWidthClass: 'w-full',
          mottoWidthClass: 'w-full',
          headerTitleClass: 'font-bold text-[13pt]',
          headerSubtitleClass: 'font-bold text-[13pt]'
        };
      case 5: // Bold / Heavy
        return {
          ...base,
          companyAlign: 'text-center font-black',
          mottoAlign: 'text-center font-black',
          titleAlign: 'text-center uppercase tracking-widest',
          headerTitleClass: 'font-black text-[12pt]',
          headerSubtitleClass: 'font-black text-[12pt]',
          titleClass: 'font-black text-3xl',
          headerSubtitleBorderClass: 'border-b-2 border-black'
        };
      case 6: // Thin Border
        return {
          ...base,
          container: 'font-serif text-[11pt] leading-relaxed border border-gray-500 p-12',
          header: 'flex justify-between items-start mb-7',
          headerSubtitleClass: 'font-semibold text-[12pt]'
        };
      case 7: // Wide Margin
        return {
          ...base,
          container: 'font-serif text-[11pt] leading-relaxed p-16',
          header: 'flex justify-between items-start mb-10',
          companyAlign: 'text-left',
          mottoAlign: 'text-right',
          headerTitleClass: 'font-semibold text-[11pt]'
        };
      case 8: // Compact
        return {
          ...base,
          container: 'font-serif text-[10pt] leading-snug p-10',
          header: 'flex justify-between items-start mb-6',
          headerTitleClass: 'font-bold text-[10pt]',
          headerSubtitleClass: 'font-bold text-[11pt]',
          titleClass: 'font-bold text-xl'
        };
      case 9: // Large Title
        return {
          ...base,
          header: 'flex justify-between items-start mb-6',
          titleClass: 'font-bold text-3xl'
        };
      case 10: // Serif Centered Header
        return {
          ...base,
          container: 'font-serif text-[11pt] leading-relaxed p-12 border-t-2 border-b-2 border-black',
          headerTitleClass: 'font-semibold text-[11pt]'
        };
      case 11: // Modern Sans Light
        return {
          ...base,
          container: 'font-sans text-[10pt] leading-relaxed p-12',
          header: 'flex justify-between items-start mb-8 border-b border-gray-700 pb-3',
          companyAlign: 'text-left',
          mottoAlign: 'text-right',
          titleAlign: 'text-left',
          fontFamily: '"Helvetica Neue", Arial, sans-serif',
          headerTitleClass: 'font-semibold text-[11pt]',
          headerSubtitleClass: 'font-bold text-[11pt]',
          titleClass: 'font-semibold text-2xl'
        };
      case 12: // Modern Sans Bold
        return {
          ...base,
          container: 'font-sans text-[10pt] leading-relaxed p-12 border border-gray-300',
          companyAlign: 'text-left font-semibold',
          mottoAlign: 'text-right font-semibold',
          titleAlign: 'text-left',
          fontFamily: '"Segoe UI", Arial, sans-serif',
          headerSubtitleClass: 'font-bold text-[11pt]',
          titleClass: 'font-bold text-2xl'
        };
      case 13: // Tall Header
        return {
          ...base,
          header: 'flex justify-between items-start mb-10',
          headerTitleClass: 'font-bold text-[12pt]',
          headerSubtitleClass: 'font-bold text-[13pt]'
        };
      case 14: // Left Title Emphasis
        return {
          ...base,
          companyAlign: 'text-left',
          mottoAlign: 'text-right',
          titleAlign: 'text-left',
          headerTitleClass: 'font-semibold text-[11pt]',
          headerSubtitleClass: 'font-semibold text-[12pt]'
        };
      case 15: // Uppercase Header
        return {
          ...base,
          header: 'flex justify-between items-start mb-7',
          companyAlign: 'text-center uppercase tracking-wide',
          mottoAlign: 'text-center uppercase tracking-wide',
          titleAlign: 'text-center uppercase'
        };
      case 16: // Soft Gray
        return {
          ...base,
          container: 'font-serif text-[11pt] leading-relaxed p-12 border border-gray-200',
          companyAlign: 'text-center text-gray-700',
          mottoAlign: 'text-center text-gray-700',
          headerTitleClass: 'font-semibold text-[11pt]',
          headerSubtitleClass: 'font-semibold text-[12pt]'
        };
      case 17: // Formal Serif
        return {
          ...base,
          container: 'font-serif text-[12pt] leading-relaxed p-12',
          fontFamily: '"Georgia", "Times New Roman", serif',
          headerTitleClass: 'font-bold text-[12pt]',
          headerSubtitleClass: 'font-bold text-[13pt]'
        };
      case 18: // Classic Border
        return {
          ...base,
          container: 'font-serif text-[11pt] leading-relaxed p-12 border-2 border-black'
        };
      case 19: // Double Bottom Header
        return {
          ...base,
          header: 'flex justify-between items-start mb-8 border-b-2 border-double border-black pb-2',
          headerTitleClass: 'font-semibold text-[11pt]'
        };
      case 20: // Tall Spacing
        return {
          ...base,
          container: 'font-serif text-[11pt] leading-loose p-12',
          header: 'flex justify-between items-start mb-10',
          headerTitleClass: 'font-semibold text-[11pt]',
          headerSubtitleClass: 'font-semibold text-[12pt]'
        };
      case 21: // Compact Sans
        return {
          ...base,
          container: 'font-sans text-[10pt] leading-snug p-10',
          header: 'flex justify-between items-start mb-6',
          companyAlign: 'text-left',
          mottoAlign: 'text-right',
          titleAlign: 'text-left',
          fontFamily: '"Tahoma", "Verdana", sans-serif',
          headerTitleClass: 'font-semibold text-[10pt]',
          headerSubtitleClass: 'font-bold text-[11pt]',
          titleClass: 'font-semibold text-xl'
        };
      case 22: // Formal Outline
        return {
          ...base,
          container: 'font-serif text-[11pt] leading-relaxed p-12 border border-black',
          companyAlign: 'text-left',
          mottoAlign: 'text-right',
          headerTitleClass: 'font-semibold text-[11pt]',
          headerSubtitleClass: 'font-semibold text-[12pt]'
        };
      case 23: // Condensed Title
        return {
          ...base,
          header: 'flex justify-between items-start mb-7',
          titleAlign: 'text-center tracking-wide',
          headerTitleClass: 'font-semibold text-[11pt]'
        };
      case 24: // Left Header, Center Title
        return {
          ...base,
          companyAlign: 'text-left',
          mottoAlign: 'text-right',
          headerTitleClass: 'font-semibold text-[11pt]'
        };
      case 25: // Compact Border
        return {
          ...base,
          container: 'font-serif text-[10pt] leading-relaxed p-10 border border-gray-400',
          header: 'flex justify-between items-start mb-6',
          headerTitleClass: 'font-semibold text-[10pt]',
          headerSubtitleClass: 'font-semibold text-[11pt]',
          titleClass: 'font-semibold text-xl'
        };
      default: // Standard (Format 1)
        return base;
    }
  };

  const styles = getFormatStyles(formatId);

  return (
    <div 
      ref={ref}
      data-export-preview="true"
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
        <div className={`${styles.companyAlign} ${styles.companyWidthClass}`}>
          <div className={`uppercase ${styles.headerTitleClass}`}>{data.companyName}</div>
          <div className={`uppercase ${styles.headerTitleClass} border-b border-black pb-1 inline-block mb-1`}>{data.department}</div>
          <div className="italic text-[11pt]">Số: {data.documentNumber}</div>
        </div>
        <div className={`${styles.mottoAlign} ${styles.mottoWidthClass}`}>
          <div className={`uppercase ${styles.headerTitleClass}`}>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</div>
          <div className={`${styles.headerSubtitleClass} ${styles.headerSubtitleBorderClass} pb-1 inline-block mb-1`}>
            Độc lập - Tự do - Hạnh phúc
          </div>
          <div className="italic text-[11pt] mt-1">{data.location}, {formattedDate}</div>
        </div>
      </div>

      {/* Title */}
      <div className={`${styles.titleAlign} mb-8 mt-8`}>
        <h1 className={`${styles.titleClass} uppercase mb-2`}>
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
              <span className="min-w-[150px]">Ngày sinh:</span>
              <span className="flex-1 border-b border-dotted border-black pl-2">{data.birthDate}</span>
            </div>
            <div className="flex items-baseline">
              <span className="min-w-[150px]">Căn cước công dân:</span>
              <span className="flex-1 border-b border-dotted border-black pl-2">{data.citizenId}</span>
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
              <span className="min-w-[150px]">Ngày sinh:</span>
              <span className="flex-1 border-b border-dotted border-black pl-2">{data.birthDate}</span>
            </div>
            <div className="flex items-baseline">
              <span className="min-w-[150px]">Căn cước công dân số:</span>
              <span className="flex-1 border-b border-dotted border-black pl-2">{data.citizenId}</span>
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
              <span className="min-w-[150px]">Ngày sinh:</span>
              <span className="flex-1 border-b border-dotted border-black pl-2">{data.birthDate}</span>
            </div>
            <div className="flex items-baseline">
              <span className="min-w-[150px]">Căn cước công dân:</span>
              <span className="flex-1 border-b border-dotted border-black pl-2">{data.citizenId}</span>
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
              <span className="min-w-[150px]">Ngày sinh:</span>
              <span className="flex-1 border-b border-dotted border-black pl-2">{data.birthDate}</span>
            </div>
            <div className="flex items-baseline">
              <span className="min-w-[150px]">Căn cước công dân:</span>
              <span className="flex-1 border-b border-dotted border-black pl-2">{data.citizenId}</span>
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
              <span className="min-w-[150px]">Ngày sinh:</span>
              <span className="flex-1 border-b border-dotted border-black pl-2">{data.birthDate}</span>
            </div>
            <div className="flex items-baseline">
              <span className="min-w-[150px]">Căn cước công dân:</span>
              <span className="flex-1 border-b border-dotted border-black pl-2">{data.citizenId}</span>
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
              <span className="min-w-[150px]">Ngày sinh:</span>
              <span className="flex-1 border-b border-dotted border-black pl-2">{data.birthDate}</span>
            </div>
            <div className="flex items-baseline">
              <span className="min-w-[150px]">Căn cước công dân:</span>
              <span className="flex-1 border-b border-dotted border-black pl-2">{data.citizenId}</span>
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
              <span className="min-w-[150px]">Ngày sinh:</span>
              <span className="flex-1 border-b border-dotted border-black pl-2">{data.birthDate}</span>
            </div>
            <div className="flex items-baseline">
              <span className="min-w-[150px]">Căn cước công dân:</span>
              <span className="flex-1 border-b border-dotted border-black pl-2">{data.citizenId}</span>
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
              <span className="min-w-[150px]">Ngày sinh:</span>
              <span className="flex-1 border-b border-dotted border-black pl-2">{data.birthDate}</span>
            </div>
            <div className="flex items-baseline">
              <span className="min-w-[150px]">Căn cước công dân:</span>
              <span className="flex-1 border-b border-dotted border-black pl-2">{data.citizenId}</span>
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
              <span className="min-w-[150px]">Ngày sinh:</span>
              <span className="flex-1 border-b border-dotted border-black pl-2">{data.birthDate}</span>
            </div>
            <div className="flex items-baseline">
              <span className="min-w-[150px]">Căn cước công dân:</span>
              <span className="flex-1 border-b border-dotted border-black pl-2">{data.citizenId}</span>
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
              
              <div
                className="relative w-full flex justify-center items-center"
                style={{ height: '192px' }}
              >
                 {/* Signature - Placed first */}
                 {data.showSignature && (
                   <div
                     className="absolute left-0 right-0 text-center font-signature text-4xl font-normal z-10 whitespace-nowrap"
                     style={{ bottom: '48px', transform: 'rotate(-5deg)', color: '#1e3a8a' }}
                   >
                      {data.signerName.split(' ').pop()}
                   </div>
                 )}

                 {/* Seal - Overlapping left side of signature */}
                 {data.showSeal && (
                    <div
                      className="absolute opacity-90 mix-blend-multiply z-20 pointer-events-none"
                      style={{ color: '#dc2626', top: '-16px', left: '50%', marginLeft: '-110px' }}
                    >
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
                            <p
                              className="font-bold uppercase text-[11px] leading-tight font-serif"
                              style={{ wordBreak: 'break-word', fontFamily: '"Times New Roman", serif', color: '#dc2626' }}
                            >
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
              
              <div
                className="relative w-full flex justify-center items-center"
                style={{ height: '192px' }}
              >
                 {/* Signature */}
                 {data.showSignature && (
                   <div
                     className="absolute left-0 right-0 text-center font-signature text-4xl font-normal z-10 whitespace-nowrap"
                     style={{ bottom: '48px', transform: 'rotate(-5deg)', color: '#1e3a8a' }}
                   >
                      {data.signerName.split(' ').pop()}
                   </div>
                 )}

                 {/* Seal */}
                 {data.showSeal && (
                    <div
                      className="absolute opacity-90 mix-blend-multiply z-20 pointer-events-none"
                      style={{ color: '#dc2626', top: '-16px', left: '50%', marginLeft: '-110px' }}
                    >
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
                            <p
                              className="font-bold uppercase text-[11px] leading-tight font-serif"
                              style={{ wordBreak: 'break-word', fontFamily: '"Times New Roman", serif', color: '#dc2626' }}
                            >
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
    </div>
  );
});

DocumentPreview.displayName = 'DocumentPreview';

export default DocumentPreview;
