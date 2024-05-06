# import fitz  # PyMuPDF
#
# def extract_text_from_pdf(pdf_path):
#     text = ""
#     with fitz.open(pdf_path) as doc:
#         for page in doc:
#             text += page.get_text()
#     return text
#
# # Example usage
# pdf_path = "report.pdf"  # Change this to the path of your PDF file
# pdf_text = extract_text_from_pdf(pdf_path)
# print(pdf_text)


import cloudinary
# from cloudinary.search import expression
# from cloudinary.search import operators
import fitz  # PyMuPDF
import requests

# Configure Cloudinary
cloudinary.config(
    cloud_name=NAME,
    api_key=KEY,
    api_secret=API_SECRET
)

def extract_text_from_pdf(pdf_url):
    text = ""
    # Fetch the PDF from Cloudinary
    response = requests.get(pdf_url)
    with fitz.open(stream=response.content, filetype="pdf") as doc:
        for page in doc:
            text += page.get_text()
    return text

# Example usage
pdf_url = "https://res.cloudinary.com/dw0jrljkh/image/upload/v1712777687/dtu/Screenshot-2023-04-03-at-1.01.30-PM_1_1_odnaxs.pdf"  # Replace "CLOUDINARY_URL" with the actual Cloudinary URL of your PDF file
pdf_text = extract_text_from_pdf(pdf_url)
# print(pdf_text)




import pathlib
import textwrap

import google.generativeai as genai

from IPython.display import display
from IPython.display import Markdown


def to_markdown(text):
  text = text.replace('•', '  *')
  return Markdown(textwrap.indent(text, '> ', predicate=lambda _: True))

GOOGLE_API_KEY=GEMINI_KEY

genai.configure(api_key=GOOGLE_API_KEY)

for m in genai.list_models():
  if 'generateContent' in m.supported_generation_methods:
    print(m.name)


model = genai.GenerativeModel('gemini-1.5-pro-latest')

response = model.generate_content("extract the values of all the tests in this and give in a structured manner with test name, value, and range and convert commas as point for a decimal place   " + pdf_text)

# print(response.text)

response_2 = model.generate_content("give the out of range test names and values from this    " + response.text)

print(response_2.text)