import requests
from PyPDF2 import PdfReader
import io

def read_pdf_from_cloudinary(url):
    response = requests.get(url)
    if response.status_code == 200:
        # Read the PDF content from the response
        pdf_content = io.BytesIO(response.content)

        # Extract text from the PDF content
        text = ""
        pdf_reader = PdfReader(pdf_content)
        for page_num in range(len(pdf_reader.pages)):
            page = pdf_reader.pages[page_num]
            text += page.extract_text()

        return text
    else:
        print("Failed to fetch the PDF from Cloudinary.")
        return None

# Example usage
cloudinary_url = "https://res.cloudinary.com/dw0jrljkh/image/upload/v1712905432/dtu/EVS-Class_Lectures_1_jw9avu.pdf"
pdf_text = read_pdf_from_cloudinary(cloudinary_url)
if pdf_text:
    print(pdf_text)
