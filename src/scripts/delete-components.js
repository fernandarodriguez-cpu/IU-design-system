const fs = require('fs');
const path = require('path');

const dirsToDelete = [
  'src/app/components/design-system/molecules/KTransfer',
  'src/app/components/design-system/molecules/KTreeSelect',
  'src/app/components/design-system/atoms/KAffix',
  'src/app/components/design-system/molecules/KMentions',
  'src/app/components/design-system/atoms/KWatermark',
  'src/app/components/design-system/atoms/KRate',
];

dirsToDelete.forEach(dir => {
  const fullPath = path.join(process.cwd(), dir);
  if (fs.existsSync(fullPath)) {
    fs.rmSync(fullPath, { recursive: true, force: true });
    console.log(`Deleted ${dir}`);
  }
});
