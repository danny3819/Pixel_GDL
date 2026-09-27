export function getWhatsAppQuoteLink(brand: string, model: string, issue: string): string {
  const phoneNumber = "523317763082";
  const message = `¡Hola Pixel Center GDL! 📱
Me gustaría cotizar la reparación de mi celular:
• Marca: ${brand}
• Modelo: ${model}
• Falla / Servicio: ${issue}

¿Podrían indicarme costo aproximado y tiempo de entrega?`;

  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}
