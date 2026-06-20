"use client";

import { useEffect } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Save, AlertCircle, Store, CreditCard, Truck, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

import { useGetSettingsQuery, useUpdateSettingsMutation } from "@/lib/store/apis/store-settings-api";

const settingsSchema = z.object({
  isAcceptingOrders: z.boolean(),
  freeShippingThreshold: z.coerce.number().min(0),
  shippingCost: z.coerce.number().min(0),
  taxRate: z.coerce.number().min(0).max(100),
  isTaxInclusive: z.boolean(),
});

type SettingsFormValues = z.infer<typeof settingsSchema>;

export default function StoreSettingsPage() {
  const { data: settings, isLoading } = useGetSettingsQuery();
  const [updateSettings, { isLoading: isUpdating }] = useUpdateSettingsMutation();

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<z.input<typeof settingsSchema>, any, SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      isAcceptingOrders: true,
      freeShippingThreshold: 5000,
      shippingCost: 200,
      taxRate: 18,
      isTaxInclusive: true,
    },
  });

  useEffect(() => {
    if (settings) {
      reset({
        isAcceptingOrders: settings.isAcceptingOrders,
        freeShippingThreshold: settings.freeShippingThreshold,
        shippingCost: settings.shippingCost,
        taxRate: settings.taxRate * 100,
        isTaxInclusive: settings.isTaxInclusive,
      });
    }
  }, [settings, reset]);

  const onSubmit: SubmitHandler<SettingsFormValues> = async (data) => {
    try {
      const formattedData = {
        ...data,
        taxRate: data.taxRate / 100,
      };
      
      await updateSettings(formattedData);
      toast.success("Store settings updated successfully.");
    } catch (error) {
      toast.error("Failed to update store settings.");
    }
  };

  const isAcceptingOrders = watch("isAcceptingOrders");

  if (isLoading) return <div className="p-8 text-center text-muted-foreground animate-pulse">Loading settings...</div>;

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-primary font-bold tracking-tight">Store Configuration</h1>
        <p className="text-muted-foreground mt-2">Manage live checkout rules, taxes, and global store behavior.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        
        {/* STORE STATUS */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border/50">
            <Store className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Store Status</h2>
          </div>
          
          <div className="flex flex-row items-center justify-between rounded-lg border border-border/50 p-4 shadow-sm">
            <div className="space-y-0.5">
              <label className="text-base font-semibold">Accept Checkout Orders</label>
              <p className="text-sm text-muted-foreground">
                Turn this off to temporarily pause all checkouts (e.g., during inventory audits).
              </p>
            </div>
            <Controller
              name="isAcceptingOrders"
              control={control}
              render={({ field }) => (
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
          </div>
          
          {!isAcceptingOrders && (
            <div className="mt-4 flex gap-2 items-center text-sm text-destructive bg-destructive/10 p-3 rounded-md border border-destructive/20">
              <AlertCircle className="h-4 w-4" />
              <span>Customers will see a warning at checkout and cannot process payments.</span>
            </div>
          )}
        </div>

        {/* FINANCIALS & TAX */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border/50">
            <CreditCard className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Taxes & Pricing</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">Default GST Rate (%)</label>
              <Controller
                name="taxRate"
                control={control}
                render={({ field: { value, onChange, onBlur, ref } }) => (
                  <Input 
                    ref={ref}
                    type="number" 
                    placeholder="18" 
                    value={value as number}
                    onBlur={onBlur}
                    onChange={(e) => onChange(e.target.valueAsNumber || 0)}
                    className={errors.taxRate ? "border-red-500" : ""}
                  />
                )}
              />
              <p className="text-sm text-muted-foreground">The standard tax percentage applied to apparel.</p>
              {errors.taxRate && <p className="text-[0.8rem] font-medium text-destructive">{errors.taxRate.message}</p>}
            </div>

            <div className="flex flex-col justify-center pt-2">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium leading-none">Prices Include GST</label>
                  <p className="text-sm text-muted-foreground">Toggle off to add GST at checkout.</p>
                </div>
                <Controller
                  name="isTaxInclusive"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>
            </div>
          </div>
        </div>

        {/* LOGISTICS & SHIPPING */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border/50">
            <Truck className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Logistics Rules</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">Standard Delivery Fee (₹)</label>
              <Controller
                name="shippingCost"
                control={control}
                render={({ field: { value, onChange, onBlur, ref } }) => (
                  <Input 
                    ref={ref}
                    type="number" 
                    placeholder="200" 
                    value={value as number}
                    onBlur={onBlur}
                    onChange={(e) => onChange(e.target.valueAsNumber || 0)}
                    className={errors.shippingCost ? "border-red-500" : ""}
                  />
                )}
              />
              <p className="text-sm text-muted-foreground">Flat rate applied to orders below the threshold.</p>
              {errors.shippingCost && <p className="text-[0.8rem] font-medium text-destructive">{errors.shippingCost.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">Free Shipping Threshold (₹)</label>
              <Controller
                name="freeShippingThreshold"
                control={control}
                render={({ field: { value, onChange, onBlur, ref } }) => (
                  <Input 
                    ref={ref}
                    type="number" 
                    placeholder="5000" 
                    value={value as number}
                    onBlur={onBlur}
                    onChange={(e) => onChange(e.target.valueAsNumber || 0)}
                    className={errors.freeShippingThreshold ? "border-red-500" : ""}
                  />
                )}
              />
              <p className="text-sm text-muted-foreground">Orders equal to or above this value ship free.</p>
              {errors.freeShippingThreshold && <p className="text-[0.8rem] font-medium text-destructive">{errors.freeShippingThreshold.message}</p>}
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button type="submit" size="lg" disabled={isUpdating} className="gap-2 px-8">
            {isUpdating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save Configuration
          </Button>
        </div>
      </form>
    </div>
  );
}