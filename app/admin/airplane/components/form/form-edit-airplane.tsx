'use client';

import InputFile from '@/components/input-file';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import UseEditAirplane, { AirplaneSingle } from '../../hooks/useEditAirplane';
import { Airplanes } from '@/components/dataTable/columns';
import { Controller } from 'react-hook-form';
import { toast } from 'sonner';

interface PropsTypes {
  airplane: Airplanes;
  close: () => void;
}

export default function FormEditAirplane(props: PropsTypes) {
  const { airplane, close } = props;
  const {
    register,
    control,
    handleSubmit,
    errors,
    mutateEditAirplane,
    isPendingMutateAirplane,
  } = UseEditAirplane(airplane);

  const handleUpdateAirplane = async (data: AirplaneSingle) => {
    try {
      await mutateEditAirplane(data);
      toast.success('Airplane updated successfully!', {
        duration: 3000,
        style: {
          fontFamily: 'Inter',
        },
      });
      close();
    } catch (error) {
      toast.error('Failed to update airplane', {
        duration: 3000,
        style: {
          fontFamily: 'Inter',
        },
      });
    }
  };

  return (
    <div>
      <form
        className="space-y-4"
        onSubmit={handleSubmit(handleUpdateAirplane)}
        autoComplete="off"
      >
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" {...register('name')} />
          {errors?.name && (
            <p className="text-xs text-rose-500 text-center">
              {errors.name.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="code">Code</Label>
          <Input id="code" {...register('code')} />
          {errors?.code && (
            <p className="text-xs text-rose-500 text-center">
              {errors.code.message}
            </p>
          )}
        </div>
        <div>
          <Controller
            control={control}
            name="image"
            render={({ field }) => (
              <InputFile
                name="image"
                defaultValue={airplane.image}
                onChange={(file) => field.onChange(file)}
              />
            )}
          />
          {errors?.image && (
            <p className="text-rose-500 text-xs text-center">
              {errors.image.message as string}
            </p>
          )}
        </div>
        <div className="flex items-center justify-end gap-2">
          <div>
            <Button variant="destructive" type="button" onClick={close}>
              Cancel
            </Button>
          </div>
          <Button
            variant="outline"
            type="submit"
            disabled={isPendingMutateAirplane}
          >
            {isPendingMutateAirplane ? 'Updating...' : 'Save'}
          </Button>
        </div>
      </form>
    </div>
  );
}
