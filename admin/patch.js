const fs = require('fs');
const path = require('path');
const tabsDir = path.join(__dirname, 'components/tabs');
const tabs = ['ServicesTab.jsx', 'TestimonialsTab.jsx', 'GalleryTab.jsx', 'CategoriesTab.jsx', 'SubmissionsTab.jsx'];

for (const tab of tabs) {
  const filePath = path.join(tabsDir, tab);
  if (!fs.existsSync(filePath)) {
    console.log("Missing", filePath);
    continue;
  }
  let content = fs.readFileSync(filePath, 'utf8');

  // Fix colors
  content = content.replace(/bg-cream/g, 'bg-white').replace(/text-cream/g, 'text-white');

  // Inject import
  if (!content.includes('ConfirmModal')) {
    content = content.replace(/import (.*) from [\"']lucide-react[\"'];/, (match) => {
      return match + '\nimport ConfirmModal from "../ui/ConfirmModal";';
    });
  }

  // Inject state
  if (!content.includes('const [confirmModal')) {
    // Attempt to inject right after the first line of the component body
    content = content.replace(/(export default function [a-zA-Z]+\(\) \{)/, (match) => {
      return match + '\n  const [confirmModal, setConfirmModal] = useState({ isOpen: false, id: null, type: null, customText: null });';
    });
  }

  // Update specific tabs logic
  if (tab === 'ServicesTab.jsx') {
    content = content.replace(/if \(!confirm\("Are you sure you want to delete this service\?"\)\) return;/g, '');
    content = content.replace(/<button onClick=\{\(\) => handleDelete\(service\._id\)\}/g, '<button onClick={() => setConfirmModal({ isOpen: true, id: service._id, type: "Delete Service", customText: "Are you sure you want to delete this service?" })}');
  }
  else if (tab === 'TestimonialsTab.jsx') {
    content = content.replace(/if \(!confirm\("Delete this testimonial\?"\)\) return;/g, '');
    content = content.replace(/<button onClick=\{\(\) => handleDelete\(item\._id\)\}/g, '<button onClick={() => setConfirmModal({ isOpen: true, id: item._id, type: "Delete Testimonial", customText: "Delete this testimonial?" })}');
  }
  else if (tab === 'GalleryTab.jsx') {
    content = content.replace(/if \(!confirm\("Delete this image\?"\)\) return;/g, '');
    content = content.replace(/<button onClick=\{\(\) => handleDelete\(image\._id\)\}/g, '<button onClick={() => setConfirmModal({ isOpen: true, id: image._id, type: "Delete Image", customText: "Delete this image?" })}');
  }
  else if (tab === 'CategoriesTab.jsx') {
    // Need to handle both service category and car category. Let's just fix the generic `confirm` logic.
    // Instead of replacing the generic handleDelete, let's fix the button clicks:
    content = content.replace(/if \(!confirm\(`Are you sure you want to delete "\$\{name\}"\?`\)\) return;/g, '');
    
    // For car categories
    content = content.replace(/<button onClick=\{\(\) => handleDelete\(cat\)\}/g, '<button onClick={() => setConfirmModal({ isOpen: true, id: cat, type: "Delete Car Category", customText: `Are you sure you want to delete "${cat}"?` })}');
    // For service categories
    content = content.replace(/<button onClick=\{\(\) => handleDeleteServiceCat\(cat\)\}/g, '<button onClick={() => setConfirmModal({ isOpen: true, id: cat, type: "Delete Service Category", customText: `Are you sure you want to delete "${cat}"?` })}');
  }
  else if (tab === 'SubmissionsTab.jsx') {
    content = content.replace(/if \(!confirm\("Are you sure you want to delete this submission\?"\)\) return;/g, '');
    content = content.replace(/<button onClick=\{\(\) => handleDelete\(submission\._id\)\}/g, '<button onClick={() => setConfirmModal({ isOpen: true, id: submission._id, type: "Delete Submission", customText: "Are you sure you want to delete this submission?" })}');
  }

  // Inject ConfirmModal JSX before final </div>
  if (!content.includes('<ConfirmModal')) {
    // replace the last </div>
    const parts = content.split('</div>');
    if (parts.length > 1) {
      const lastIndex = content.lastIndexOf('</div>');
      content = content.substring(0, lastIndex) + `      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({ isOpen: false, id: null, type: null, customText: null })}
        onConfirm={() => {
          if (confirmModal.type === 'Delete Service Category') {
             handleDeleteServiceCat(confirmModal.id);
          } else {
             handleDelete(confirmModal.id); // for CategoriesTab it's handleDelete(cat)
          }
        }}
        title={confirmModal.type}
        message={confirmModal.customText}
      />\n    </div>` + content.substring(lastIndex + 6);
    }
  }

  fs.writeFileSync(filePath, content, 'utf8');
}
console.log("Done");
