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
              "career_interest": formData.getAll('career_interest[]') || [],
              "intern_location": formData.getAll('intern_location[]') || [],
              "email": formData.get('email') || "",
              "gpa": formData.get('gpa') || "",
              "grad_year": formData.get('grad_year') || "",
              "location": formData.get('location') || "",
              "major": formData.get('major') || "",
              "minor": formData.get('minor') || "",
              "name": formData.get('name') || "",
              "note": formData.get('note') || "",
              "open_q1": formData.get('open_q1') || "",
              "open_q2": formData.get('open_q2') || "",
              "open_q3": formData.get('open_q3') || "",
              "phone": formData.get('phone') || "",
              "referral": formData.get('referral') || "",
              "resume": [
                {
                  "file_token": fileToken,
                  "name": `${formData.get('name')}_${Math.floor(Date.now() / 1000)}.pdf`
                }
              ],
              "source": formData.getAll('source[]') || [],
              "university": formData.get('university') || "",
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
