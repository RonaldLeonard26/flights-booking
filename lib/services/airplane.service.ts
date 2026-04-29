import { AirplanePayload } from '@/app/admin/airplane/hooks/useAddAirplane';
import { createBrowserClient } from '@supabase/ssr';

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export const airplaneServices = {
  async getAirplanes() {
    const { data, error } = await supabase
      .from('airplanes')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async getAirplaneById() {},

  async create(payload: AirplanePayload) {
    //1. proses setiap airplane dalam payload
    const uploadPromises = payload.airplanes.map(async (item) => {
      const fileName = `${Date.now()}-${item.image.name}`;

      //upload ke storage bucket
      const { data: storageData, error: storageError } = await supabase.storage
        .from('airplanes')
        .upload(fileName, item.image, {
          cacheControl: '3600',
          upsert: false,
        });

      if (storageError) throw storageError;

      //ambil public url
      const {
        data: { publicUrl },
      } = supabase.storage.from('airplanes').getPublicUrl(fileName);

      //kembalikan object data yg siap insert ke table
      return {
        name: item.name,
        code: item.code,
        image: publicUrl,
      };
    });

    const airplanesData = await Promise.all(uploadPromises);

    //2. insert array data ke table
    const { data, error } = await supabase
      .from('airplanes')
      .insert(airplanesData);

    if (error) throw error;

    return data;
  },

  async update(
    id: string,
    payload: { name: string; code: string; image: File | string },
  ) {
    let imageUrl = payload.image;

    // jika image adalah file(user ganti gambar baru), upload ke storage dulu
    if (payload.image instanceof File) {
      const fileName = `${crypto.randomUUID()}-${payload.image.name}`;

      const { data: storageData } = await supabase.storage
        .from('airplanes')
        .upload(fileName, payload.image);

      const {
        data: { publicUrl },
      } = supabase.storage.from('airplanes').getPublicUrl(fileName);

      imageUrl = publicUrl;
    }
    //update baris di data base
    const { data, error } = await supabase
      .from('airplanes')
      .update({ name: payload.name, code: payload.code, image: imageUrl })
      .eq('id', id);

    if (error) throw error;

    return data;
  },

  async remove() {},
};
