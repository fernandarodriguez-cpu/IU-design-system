const fs = require('fs');
const path = require('path');

const dirsToDelete = [
  'src/app/components/design-system/molecules/KTransfer',
  'src/app/components/design-system/molecules/KTreeSelect',
  'src/app/components/design-system/atoms/KAffix',
  'src/app/components/design-system/molecules/KMentions',
  'src/app/components/design-system/atoms/KWatermark',
  'src/app/components/design-system/atoms/KRate',
  'src/app/components/design-system/organisms/KDataGrid',
  'src/app/components/design-system/organisms/KMessage',
  'src/app/components/design-system/organisms/KNotification',
  'src/app/components/design-system/organisms/KModalConfirm'
];

console.log("Iniciando purga de componentes legados de AntD...");

let successCount = 0;

dirsToDelete.forEach(dir => {
  const fullPath = path.join(process.cwd(), dir);
  if (fs.existsSync(fullPath)) {
    try {
      fs.rmSync(fullPath, { recursive: true, force: true });
      console.log(`✅ Eliminado: ${dir}`);
      successCount++;
    } catch (err) {
      console.error(`❌ Error al eliminar ${dir}: ${err.message}`);
    }
  } else {
    console.log(`⚠️ No encontrado (quizás ya se eliminó): ${dir}`);
  }
});

// Rename KDrawer to KSheet
const drawerPath = path.join(process.cwd(), 'src/app/components/design-system/organisms/KDrawer');
const sheetPath = path.join(process.cwd(), 'src/app/components/design-system/organisms/KSheet');

if (fs.existsSync(drawerPath)) {
  try {
    fs.renameSync(drawerPath, sheetPath);
    console.log(`✅ Renombrado: KDrawer -> KSheet`);
  } catch (err) {
    console.error(`❌ Error al renombrar KDrawer: ${err.message}`);
  }
}

console.log(`\n¡Limpieza finalizada! Eliminados: ${successCount} componentes.`);
