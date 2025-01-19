// src/lib/form-submission.ts

import { getLarkAccessToken } from './lark/auth';

interface FormData {
  name: string;
  email: string;
  phone: string;
  location: string;
  university: string;
  grad_year: string;
  major: string;
  minor: string;
  gpa: string;
  career_interest: string[];
  intern_location: string[];
  open_q1: string;
  open_q2: string;
  open_q3: string;
  note?: string;
  referral?: string;
  resume: File;
}

export async function uploadFile(file: File, fullName: string): Promise<string> {
  try {
    const token = await getLarkAccessToken();
    const formData = new FormData();

    // Get current Unix timestamp
    const timestamp = Math.floor(Date.now() / 1000);
    const fileName = `${fullName}_${timestamp}.pdf`;

    formData.append('file_name', fileName);
    formData.append('parent_type', 'bitable');
    formData.append('parent_node', 'IIIPbWSXMa0MC0sRll6uJJVPs1b');
    formData.append('size', file.size.toString());
    formData.append('file', file);

    const response = await fetch('https://open.larksuite.com/open-apis/drive/v1/files/upload_all', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();

    if (data.code !== 0) {
      throw new Error(data.msg || 'File upload failed');
    }

    return data.data.file_token;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
}

export async function submitFormData(formData: FormData, fileToken: string): Promise<boolean> {
  try {
    const token = await getLarkAccessToken();

    const payload = {
      fields: {
        "Submitted on": Date.now(),
        "career_interest": formData.career_interest,
        "email": formData.email,
        "gpa": formData.gpa,
        "grad_year": formData.grad_year,
        "intern_location": formData.intern_location,
        "location": formData.location,
        "major": formData.major,
        "minor": formData.minor,
        "name": formData.name,
        "note": formData.note || "",
        "open_q1": formData.open_q1,
        "open_q2": formData.open_q2,
        "open_q3": formData.open_q3,
        "phone": formData.phone,
        "referral": formData.referral || "",
        "resume": [
          {
            "file_token": fileToken,
            "name": `${formData.name}_${Math.floor(Date.now() / 1000)}.pdf`
          }
        ],
        "source": formData.referral ? ["Referral"] : [],
        "university": formData.university,
      }
    };

    const response = await fetch(
      `https://open.larksuite.com/open-apis/bitable/v1/apps/IIIPbWSXMa0MC0sRll6uJJVPs1b/tables/tblrikeuHfIUVjAp/records`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(payload),
      }
    );

    return response.status === 200;
  } catch (error) {
    console.error('Error submitting form data:', error);
    throw error;
  }
}
