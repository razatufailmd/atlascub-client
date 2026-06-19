"use client";

import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Import the schema and type securely from your validations folder
import { checkoutSchema, type CheckoutFormValues } from "@/lib/validations/checkout-schema";

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli",
  "Daman and Diu", "Delhi", "Lakshadweep", "Puducherry"
];

interface CheckoutFormProps {
  onSubmit: SubmitHandler<CheckoutFormValues>;
  isSubmitting: boolean;
  defaultValues?: Partial<CheckoutFormValues>;
}

export function CheckoutForm({ onSubmit, isSubmitting, defaultValues }: CheckoutFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.input<typeof checkoutSchema>, any, CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      firstName: defaultValues?.firstName || "",
      lastName: defaultValues?.lastName || "",
      email: defaultValues?.email || "",
      phone: defaultValues?.phone || "",
      addressLine1: defaultValues?.addressLine1 || "",
      addressLine2: defaultValues?.addressLine2 || "",
      city: defaultValues?.city || "",
      state: defaultValues?.state || "",
      pincode: defaultValues?.pincode || "",
      country: "India",
    },
  });

  return (
    <div className="bg-card p-6 rounded-lg border shadow-sm">
      <h2 className="text-xl font-semibold mb-6">Shipping Address</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">First Name</label>
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <Input placeholder="John" {...field} className={errors.firstName ? "border-red-500" : ""} />
              )}
            />
            {errors.firstName && <p className="text-[0.8rem] font-medium text-destructive">{errors.firstName.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Last Name</label>
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <Input placeholder="Doe" {...field} className={errors.lastName ? "border-red-500" : ""} />
              )}
            />
            {errors.lastName && <p className="text-[0.8rem] font-medium text-destructive">{errors.lastName.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Email Address</label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input type="email" placeholder="john@example.com" {...field} className={errors.email ? "border-red-500" : ""} />
              )}
            />
            {errors.email && <p className="text-[0.8rem] font-medium text-destructive">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Phone Number</label>
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <Input 
                  placeholder="9876543210" 
                  type="tel" 
                  maxLength={10}
                  {...field} 
                  className={errors.phone ? "border-red-500" : ""}
                />
              )}
            />
            {errors.phone && <p className="text-[0.8rem] font-medium text-destructive">{errors.phone.message}</p>}
          </div>
        </div>

        <hr className="my-4 border-muted" />

        <div className="space-y-2">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Address Line 1</label>
          <Controller
            name="addressLine1"
            control={control}
            render={({ field }) => (
              <Input placeholder="House/Flat No., Building Name, Street" {...field} className={errors.addressLine1 ? "border-red-500" : ""} />
            )}
          />
          {errors.addressLine1 && <p className="text-[0.8rem] font-medium text-destructive">{errors.addressLine1.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Address Line 2 (Optional)</label>
          <Controller
            name="addressLine2"
            control={control}
            render={({ field }) => (
              <Input placeholder="Landmark, Locality" {...field} className={errors.addressLine2 ? "border-red-500" : ""} />
            )}
          />
          {errors.addressLine2 && <p className="text-[0.8rem] font-medium text-destructive">{errors.addressLine2.message}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">City</label>
            <Controller
              name="city"
              control={control}
              render={({ field }) => (
                <Input placeholder="Mumbai" {...field} className={errors.city ? "border-red-500" : ""} />
              )}
            />
            {errors.city && <p className="text-[0.8rem] font-medium text-destructive">{errors.city.message}</p>}
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">State</label>
            <Controller
              name="state"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className={errors.state ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select a state" />
                  </SelectTrigger>
                  <SelectContent>
                    {INDIAN_STATES.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.state && <p className="text-[0.8rem] font-medium text-destructive">{errors.state.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">PIN Code</label>
            <Controller
              name="pincode"
              control={control}
              render={({ field }) => (
                <Input 
                  placeholder="400001" 
                  maxLength={6}
                  {...field} 
                  className={errors.pincode ? "border-red-500" : ""}
                />
              )}
            />
            {errors.pincode && <p className="text-[0.8rem] font-medium text-destructive">{errors.pincode.message}</p>}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Country</label>
            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <Input {...field} disabled className="bg-muted" />
              )}
            />
            {errors.country && <p className="text-[0.8rem] font-medium text-destructive">{errors.country.message}</p>}
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full h-12 text-lg mt-8"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Processing...
            </>
          ) : (
            "Proceed to Payment"
          )}
        </Button>
      </form>
    </div>
  );
}