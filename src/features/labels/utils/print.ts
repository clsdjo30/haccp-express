/**
 * Label printing utilities
 */

/* eslint-disable max-lines-per-function */
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

import { formatDate } from '@/lib/format';

import type { LabelPrintData } from '../types';

/**
 * Generate HTML for label printing
 */
export function generateLabelHTML(data: LabelPrintData): string {
  const productionDate = formatDate(new Date(data.productionDate));
  const dlcDate = formatDate(new Date(data.dlc));

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            font-family: 'Helvetica', 'Arial', sans-serif;
            padding: 10mm;
            background: white;
          }

          .label {
            width: 70mm;
            min-height: 50mm;
            border: 2px solid #000;
            padding: 3mm;
            background: white;
          }

          .header {
            text-align: center;
            border-bottom: 2px solid #000;
            padding-bottom: 2mm;
            margin-bottom: 3mm;
          }

          .restaurant-name {
            font-size: 10pt;
            font-weight: bold;
            text-transform: uppercase;
          }

          .product-name {
            font-size: 14pt;
            font-weight: bold;
            text-align: center;
            margin: 3mm 0;
            padding: 2mm;
            background: #f0f0f0;
          }

          .date-section {
            margin: 3mm 0;
          }

          .date-row {
            display: flex;
            justify-content: space-between;
            padding: 2mm 0;
            border-bottom: 1px solid #ccc;
          }

          .date-label {
            font-size: 9pt;
            font-weight: bold;
          }

          .date-value {
            font-size: 9pt;
          }

          .dlc-section {
            margin-top: 3mm;
            padding: 3mm;
            background: #000;
            color: white;
            text-align: center;
          }

          .dlc-label {
            font-size: 8pt;
            font-weight: bold;
          }

          .dlc-value {
            font-size: 16pt;
            font-weight: bold;
            margin-top: 1mm;
          }

          .batch-section {
            margin-top: 3mm;
            font-size: 8pt;
            text-align: center;
          }

          .storage-instructions {
            margin-top: 3mm;
            padding: 2mm;
            border: 1px solid #000;
            font-size: 8pt;
            line-height: 1.3;
          }

          .footer {
            margin-top: 3mm;
            padding-top: 2mm;
            border-top: 1px solid #ccc;
            font-size: 7pt;
            text-align: center;
            color: #666;
          }
        </style>
      </head>
      <body>
        <div class="label">
          <div class="header">
            <div class="restaurant-name">${data.restaurantName}</div>
          </div>

          <div class="product-name">${data.productName}</div>

          <div class="date-section">
            <div class="date-row">
              <span class="date-label">Production:</span>
              <span class="date-value">${productionDate}</span>
            </div>
          </div>

          <div class="dlc-section">
            <div class="dlc-label">DATE LIMITE DE CONSOMMATION</div>
            <div class="dlc-value">${dlcDate}</div>
          </div>

          ${
            data.batchNumber
              ? `
          <div class="batch-section">
            Lot: ${data.batchNumber}
          </div>
          `
              : ''
          }

          ${
            data.storageInstructions
              ? `
          <div class="storage-instructions">
            <strong>Conservation:</strong><br>
            ${data.storageInstructions}
          </div>
          `
              : ''
          }

          <div class="footer">
            Étiquette générée par HACCP Express
          </div>
        </div>
      </body>
    </html>
  `;
}

/**
 * Print label to PDF
 */
export async function printLabel(data: LabelPrintData): Promise<string> {
  try {
    const html = generateLabelHTML(data);
    const { uri } = await Print.printToFileAsync({ html });
    return uri;
  } catch (error) {
    throw new Error(
      'Erreur lors de la génération du PDF: ' +
        (error instanceof Error ? error.message : 'Erreur inconnue')
    );
  }
}

/**
 * Print and share label
 */
export async function printAndShareLabel(data: LabelPrintData): Promise<void> {
  try {
    const uri = await printLabel(data);
    const isAvailable = await Sharing.isAvailableAsync();

    if (isAvailable) {
      await Sharing.shareAsync(uri, {
        mimeType: 'application/pdf',
        dialogTitle: `Étiquette - ${data.productName}`,
        UTI: 'com.adobe.pdf',
      });
    } else {
      throw new Error("Le partage n'est pas disponible sur cet appareil");
    }
  } catch (error) {
    throw new Error(
      'Erreur lors du partage: ' +
        (error instanceof Error ? error.message : 'Erreur inconnue')
    );
  }
}

/**
 * Print label directly (opens system print dialog)
 */
export async function printLabelDirect(data: LabelPrintData): Promise<void> {
  try {
    const html = generateLabelHTML(data);
    await Print.printAsync({ html });
  } catch (error) {
    throw new Error(
      "Erreur lors de l'impression: " +
        (error instanceof Error ? error.message : 'Erreur inconnue')
    );
  }
}

/**
 * Batch print multiple labels
 */
export async function printMultipleLabels(
  labels: LabelPrintData[]
): Promise<string> {
  try {
    const htmlPages = labels
      .map((label) => generateLabelHTML(label))
      .join('\n<div style="page-break-after: always;"></div>\n');

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body>
          ${htmlPages}
        </body>
      </html>
    `;

    const { uri } = await Print.printToFileAsync({ html });
    return uri;
  } catch (error) {
    throw new Error(
      'Erreur lors de la génération des PDF: ' +
        (error instanceof Error ? error.message : 'Erreur inconnue')
    );
  }
}
