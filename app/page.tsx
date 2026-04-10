import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/server';

export default async function Home() {
  const supabase = await createClient();

  const { data, error } = await supabase.from('flights').select('*');

  console.log(data, error);
  return (
    <div>
      <Button>Click Me</Button>
      <h2>Check console</h2>
    </div>
  );
}
