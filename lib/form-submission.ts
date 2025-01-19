export async function uploadFile(file: File, fullName: string): Promise<string> {
    try {
      const formData = new FormData();
      const timestamp = Math.floor(Date.now() / 1000);
      const fileName = `${fullName}_${timestamp}.pdf`;

      formData.append('file_name', fileName);
      formData.append('parent_type', 'bitable');
      formData.append('parent_node', process.env.NEXT_PUBLIC_LARK_APP_TOKEN || '');
      formData.append('size', file.size.toString());
      formData.append('file', file);

      const response = await fetch('/api/lark/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'File upload failed');
      }

      return data.data.file_token;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }

  export async function submitFormData(formData: FormData, fileToken: string): Promise<boolean> {
    try {
      const payload = {
        fields: {
          "Submitted on": Date.now(),
          "career_interest": formData.career_interest || [],
          "email": formData.email,
          "gpa": formData.gpa,
          "grad_year": formData.grad_year,
          "intern_location": formData.intern_location || [],
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
          "source": formData.referral ? ["Referral"] : ["Other"],
          "university": formData.university,
        }
      };

      const response = await fetch('/api/lark/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      return response.ok;
    } catch (error) {
      console.error('Error submitting form data:', error);
      throw error;
    }
  }
