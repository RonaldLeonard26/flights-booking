'use client';

import InputFile from '@/components/input-file';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash } from 'lucide-react';

import useAddAirplane, { AirplanePayload } from '../../hooks/useAddAirplane';
import { Controller } from 'react-hook-form';
import { toast } from 'sonner';

interface PropsTypes {
  close: () => void;
}

export default function AirplaneForm(props: PropsTypes) {
  const { close } = props;
  // const [rows, setRows] = useState([
  //   { id: crypto.randomUUID(), name: '', code: '' },
  // ]);

  // const addRow = () => {
  //   if (rows.length < 5) {
  //     setRows([...rows, { id: crypto.randomUUID(), name: '', code: '' }]);
  //   }
  // };

  // const removeRow = (id: string) => {
  //   if (rows.length > 1) {
  //     setRows(rows.filter((row) => row.id !== id));
  //   }
  // };

  const {
    register,
    handleSubmit,
    errors,
    control,
    mutateAirplane,
    isPendingAirplane,
    fields,
    append,
    remove,
  } = useAddAirplane();

  const handleSave = async (data: AirplanePayload) => {
    try {
      await mutateAirplane(data);
      toast.success('Airplane added successfully!', {
        duration: 3000,
        style: {
          fontFamily: 'Inter',
        },
      });
      close();
    } catch (error) {
      toast.error('Failed to add airplane', {
        duration: 3000,
        style: {
          fontFamily: 'Inter',
        },
      });
    }
  };

  return (
    <form className="flex flex-col " onSubmit={handleSubmit(handleSave)}>
      <div className="flex flex-col max-h-[360px] px-2 no-scrollbar overflow-y-auto gap-4">
        {fields.map((field, index) => (
          <div key={field.id} className="relative flex flex-col space-y-4">
            <div className="grid gap-2">
              <Label htmlFor={`name-${field.id}`}>Name</Label>
              <Input
                {...register(`airplanes.${index}.name`)}
                id={`name-${field.id}`}
                type="text"
                placeholder="Input airplane name here..."
              />
              {errors.airplanes?.[index]?.name && (
                <p className="text-xs text-rose-500 text-center">
                  {errors.airplanes?.[index].name.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor={`code-${field.id}`}>Code</Label>
              <Input
                {...register(`airplanes.${index}.code`)}
                id={`code-${field.id}`}
                type="text"
                placeholder="Input airplane code here..."
              />
              {errors.airplanes?.[index]?.code && (
                <p className="text-xs text-rose-500 text-center">
                  {errors.airplanes?.[index].code.message}
                </p>
              )}
            </div>
            <div>
              <Controller
                control={control}
                name={`airplanes.${index}.image`}
                render={({ field }) => (
                  <InputFile
                    name={`airplanes.${index}.image`}
                    isDropable
                    onChange={(file) => field.onChange(file)}
                  />
                )}
              />
              {errors.airplanes?.[index]?.image && (
                <p className="text-xs text-rose-500 text-center">
                  {errors.airplanes[index].image.message as string}
                </p>
              )}
            </div>
            {fields.length > 1 && (
              <Button
                type="button"
                variant="destructive"
                className="w-full flex items-center justify-center"
                onClick={() => remove(index)}
              >
                <Trash size={14} />
              </Button>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4">
        {fields.length < 5 && (
          <Button
            className="w-full bg-gray-500"
            type="button"
            onClick={() => append({ name: '', code: '', image: null })}
          >
            <Plus size={14} /> Add More Airplane
          </Button>
        )}
      </div>
      {/* footer */}
      <div className="flex items-center justify-end mt-4">
        <div className="flex gap-2 ">
          <Button
            size="sm"
            type="button"
            variant="destructive"
            onClick={() => close()}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="outline"
            size="sm"
            disabled={isPendingAirplane}
          >
            {isPendingAirplane ? 'adding...' : 'Save'}
          </Button>
        </div>
      </div>
    </form>
  );
}
