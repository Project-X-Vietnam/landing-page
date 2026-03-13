import fitz  # PyMuPDF
import sys

def extract_text(pdf_path):
    try:
        doc = fitz.open(pdf_path)
        text = ""
        # Just getting the first 5 pages for a sample
        for i in range(min(5, len(doc))):
            text += doc[i].get_text()
        print(text)
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    if len(sys.argv) > 1:
        extract_text(sys.argv[1])
