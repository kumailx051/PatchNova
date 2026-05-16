export type Product = {
  slug: string;
  name: string;
  price: string; // e.g. "$1.25"
  minQty: string; // e.g. "10pc min"
  description: string;
  imageUrl?: string; // optional; we will use placeholders for now
};

export const products: Product[] = [
  {
    slug: 'embroidered-patches',
    name: 'Embroidered Patches',
    price: '$1.25',
    minQty: '10pc min',
    description:
      'Embroidered with premium thread on durable fabric, these patches deliver rich texture and visual detail for a quality finish on any apparel.',
  },
  {
    slug: '3d-embroidered-patches',
    name: '3D Embroidered Patches',
    price: '$2.04',
    minQty: '10pc min',
    description:
      'Our 3D embroidered patches provide a raised effect that enhances the detail and tactile appeal of your custom designs.',
  },
  {
    slug: 'full-color-printed-patches',
    name: 'Full Color Printed Patches',
    price: '$0.96',
    minQty: '10pc min',
    description:
      'Full Color Printed Patches use advanced sublimation to create sharp, vivid, and long-lasting graphics.',
  },
  {
    slug: 'pvc-rubber-patches',
    name: 'PVC Rubber Patches',
    price: '$1.96',
    minQty: '10pc min',
    description:
      'PVC patches use advanced molding techniques to create durable, visually striking designs with crisp detailing in vibrant colors.',
  },
  {
    slug: 'leather-patches',
    name: 'Genuine Leather Patches',
    price: '$1.40',
    minQty: '10pc min',
    description:
      'Premium leather patches with embossed or engraved designs for a sophisticated, durable look.',
  },
  {
    slug: 'faux-leather-patches',
    name: 'Faux Leather Patches',
    price: '$1.18',
    minQty: '10pc min',
    description:
      'Affordable leather-like patches offering the aesthetic of genuine leather with enhanced durability.',
  },
  {
    slug: 'woven-patches',
    name: 'Woven Patches',
    price: '$1.50',
    minQty: '10pc min',
    description:
      'Intricately woven patches with vibrant colors and detailed designs for a classic, professional appearance.',
  },
  {
    slug: 'full-color-flex-patches',
    name: 'TPU Full Color Patches',
    price: '$1.50',
    minQty: '10pc min',
    description:
      'Vibrant, flexible patches that bring your full-color designs to life with a modern feel.',
  },
  {
    slug: 'chenille-patches',
    name: 'Chenille Patches',
    price: '$1.75',
    minQty: '10pc min',
    description:
      'Fuzzy chenille patches with dimensional embroidery for a vintage, textured look perfect for athletic wear.',
  },
  {
    slug: 'silicone-patches',
    name: 'Silicone Transfers',
    price: '$2.10',
    minQty: '10pc min',
    description:
      'Durable, weather-resistant silicone patches perfect for heavy-duty gear and outdoor wear.',
  },
  {
    slug: 'name-patches',
    name: 'Custom Embroidered Name Patches',
    price: '$3.50',
    minQty: '1pc min',
    description:
      'Personalized name patches with high-quality embroidery, perfect for uniforms and workwear.',
  },
  {
    slug: 'dtf-transfers',
    name: 'DTF Transfers',
    price: '$1.60',
    minQty: '10pc min',
    description:
      'Clean, crisp matte white finish for a modern and minimalist aesthetic.',
  },
  {
    slug: 'chrome-flex-patches',
    name: 'Chrome Flex Patches',
    price: '$2.75',
    minQty: '10pc min',
    description:
      'High-shine chrome finish that catches the light for a premium, metallic look.',
  },
  {
    slug: 'tackle-twill-letters',
    name: 'Custom Tackle Twill Letters',
    price: '$1.90',
    minQty: '10pc min',
    description:
      'Classic collegiate style lettering made from durable tackle twill fabric.',
  },
];
