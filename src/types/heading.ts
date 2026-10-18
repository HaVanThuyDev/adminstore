export interface SiteHeading {
  id: string;
  key: string;           // Unique key for lookup, e.g. 'hero_title', 'hero_subtitle'
  section: string;       // Section name, e.g. 'Hero', 'Sản phẩm', 'Dự án'
  label: string;         // Display label for admin, e.g. 'Tiêu đề chính trang chủ'
  value: string;         // The actual heading text
  type: 'heading' | 'subheading' | 'eyebrow' | 'description';
  page: string;          // Which page this belongs to
}
