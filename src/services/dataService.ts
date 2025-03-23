const fetchData = async <T>(): Promise<T> => {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/csv/all`, {
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
};

const uploadCSV = async (file: File): Promise<{ [key: string]: string }> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/csv/upload`,
    {
      method: 'POST',
      credentials: 'include',
      body: formData,
    }
  );
  if (!response.ok) {
    throw new Error('Failed to upload CSV');
  }
  return response.json();
};

const fetchStatus = async (
  runId: string
): Promise<{ status: string; message: string }> => {
  const resp = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/csv/status?runId=${runId}`,
    {
      credentials: 'include',
    }
  );
  if (!resp.ok) {
    throw new Error('Failed to fetch status');
  }
  return resp.json();
};

export { fetchData, uploadCSV, fetchStatus };
