import { CreateReportDto } from '../dtos/create-report.dto';

const escapeHtml = (value: string): string =>
  value.replace(
    /[&<>'"]/g,
    (character) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;',
      })[character] ?? character,
  );

export const generateReportTemplate = (
  dto: CreateReportDto,
  photoUrl: string,
): string => {
  const photo = escapeHtml(photoUrl);
  const address = escapeHtml(dto.address);
  const description = escapeHtml(dto.description);
  const severity = escapeHtml(dto.severity);
  const reporterPhone = escapeHtml(dto.reporterPhone);

  return `<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>Nuevo reporte de fuga de agua</title>
  </head>
  <body style="margin:0;padding:24px;background-color:#f3f7fa;font-family:Arial,sans-serif;color:#1f2937;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;margin:0 auto;background-color:#ffffff;border-collapse:collapse;border:1px solid #dbe5ec;">
      <tr>
        <td colspan="2" style="padding:24px;background-color:#0b6fa4;color:#ffffff;">
          <h1 style="margin:0;font-size:24px;">Nuevo reporte de fuga de agua</h1>
        </td>
      </tr>
      <tr>
        <td colspan="2" style="padding:14px;border-bottom:1px solid #dbe5ec;">
          <img src="${photo}" alt="Foto de la fuga" width="600" style="display:block;width:100%;max-width:600px;height:auto;border:0;" />
        </td>
      </tr>
      <tr>
        <th align="left" style="padding:14px;border-bottom:1px solid #dbe5ec;width:180px;">Dirección</th>
        <td style="padding:14px;border-bottom:1px solid #dbe5ec;">${address}</td>
      </tr>
      <tr>
        <th align="left" style="padding:14px;border-bottom:1px solid #dbe5ec;">Descripción</th>
        <td style="padding:14px;border-bottom:1px solid #dbe5ec;">${description}</td>
      </tr>
      <tr>
        <th align="left" style="padding:14px;border-bottom:1px solid #dbe5ec;">Severidad</th>
        <td style="padding:14px;border-bottom:1px solid #dbe5ec;">${severity}</td>
      </tr>
      <tr>
        <th align="left" style="padding:14px;">Teléfono de contacto</th>
        <td style="padding:14px;">${reporterPhone}</td>
      </tr>
    </table>
  </body>
</html>`;
};
