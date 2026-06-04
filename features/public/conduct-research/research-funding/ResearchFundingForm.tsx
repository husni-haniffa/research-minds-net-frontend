"use client"
import { Button } from "@/components/ui/button"
import ButtonLoader from "@/components/ui/button-loader"
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCategories } from "@/features/admin/categories/category.hooks"
import { AlertError } from "@/components/ui/alert-error"
import { useCreateResearchFudning } from "./funding.hooks"
import { formSchema, ResearchFundingFormProps, typeofContributions } from "./types"
import { SelectSkeleton } from "@/features/user/submissions/Skeleton"


const ResearchFundingForm = ({ onSuccess } : ResearchFundingFormProps) => {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      name: "",
      mobile: "",
      whatsapp: "",
      email: "",
      linkedin: "",
      orcid: "",
      researchgate: "",
      scholar: "",
      designation: "",
      affiliation: "",
      degree: "",
      categoryId: "",
      minorResearchArea: "",
      fundingAmount: "",
      howCanYouContribute: ""
    },
  })

  const createMutation = useCreateResearchFudning(() => {
    form.reset()
    onSuccess?.()
  })

    const { data, isLoading, error } = useCategories()

    if (error instanceof Error) return <AlertError message={error.message}/>

  return (
    <Card className="w-full border-0 shadow-none">
      <CardHeader>
        <CardTitle>Research Funding & Support</CardTitle>
        <CardDescription>Submit a request for funding for your project, or provide details on how you wish to contribute funds to research initiatives.</CardDescription>
      </CardHeader>
        <CardContent>
          <form id="research-funding-submission" onSubmit={form.handleSubmit((v) => createMutation.mutate(v))}>
            <FieldGroup>
              {/* Personal Information */}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="research-funding-title">
                      Title
                      <span className="text-red-500">*</span>
                    </FieldLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger id="research-funding-title" className="w-full" aria-invalid={fieldState.invalid}>
                        <SelectValue placeholder="Select your title" className="text-xs xl:text-sm" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem key='mr' value='Mr' className="text-xs xl:text-sm">
                          Mr
                        </SelectItem>
                        <SelectItem key='miss' value='Miss' className="text-xs xl:text-sm">
                          Miss
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="research-funding-name">
                      Full Name
                      <span className="text-red-500">*</span>
                    </FieldLabel>
                    <Input
                      {...field}
                      id="research-funding-name"
                      aria-invalid={fieldState.invalid}
                      placeholder="John Doe"
                      autoComplete="name"
                      className="text-xs xl:text-sm"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="designation"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="research-funding-designation">
                      Designation
                      <span className="text-red-500">*</span>
                    </FieldLabel>
                    <Input
                      {...field}
                      id="research-funding-designation"
                      aria-invalid={fieldState.invalid}
                      placeholder="Lecturer, Researcher, Student..."
                      autoComplete="organization-title"
                      className="text-xs xl:text-sm"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              </div>
              

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Controller
                name="affiliation"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="research-funding-affiliation">
                      Institution / Affiliation
                      <span className="text-red-500">*</span>
                    </FieldLabel>
                    <Input
                      {...field}
                      id="research-funding-affiliation"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your institution or organization"
                      autoComplete="organization"
                      className="text-xs xl:text-sm"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
                         <Controller
                name="degree"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="research-funding-degree">
                      Degree
                      <span className="text-red-500">*</span>
                    </FieldLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger id="research-funding-degree" className="w-full" aria-invalid={fieldState.invalid}>
                          <SelectValue placeholder="Select your degree" className="text-xs xl:text-sm" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem key='bachelor' value='Bachelor' className="text-xs xl:text-sm">
                              Bachelor
                            </SelectItem>
                             <SelectItem key='master' value='Master' className="text-xs xl:text-sm">
                              Master
                            </SelectItem>
                             <SelectItem key='mPhil' value='MPhil' className="text-xs xl:text-sm">
                              MPhil
                            </SelectItem>
                             <SelectItem key='phD' value='PhD' className="text-xs xl:text-sm">
                              PhD
                            </SelectItem>
                               <SelectItem key='postDoc' value='PostDoc' className="text-xs xl:text-sm">
                              PostDoc
                            </SelectItem>
                        </SelectContent>
                    </Select>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              </div>

          



                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                  {/* Contact Details */}
              <Controller
                name="mobile"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="research-funding-mobile">
                      Mobile Number
                      <span className="text-red-500">*</span>
                    </FieldLabel>
                    <Input
                      {...field}
                      id="research-funding-mobile"
                      aria-invalid={fieldState.invalid}
                      placeholder="0771234567"
                      autoComplete="tel"
                      className="text-xs xl:text-sm"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="whatsapp"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="research-funding-whatsapp">
                      WhatsApp Number
                      <span className="text-red-500">*</span>
                    </FieldLabel>
                    <Input
                      {...field}
                      id="research-funding-whatsapp"
                      aria-invalid={fieldState.invalid}
                      placeholder="0771234567"
                      autoComplete="tel"
                      className="text-xs xl:text-sm"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="research-funding-email">
                      Email Address
                      <span className="text-red-500">*</span>
                    </FieldLabel>
                    <Input
                      {...field}
                      id="research-funding-email"
                      aria-invalid={fieldState.invalid}
                      placeholder="your.email@example.com"
                      autoComplete="email"
                      className="text-xs xl:text-sm"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="linkedin"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="research-funding-linkedin">
                      LinkedIn Profile
                    </FieldLabel>
                    <Input
                      {...field}
                      id="research-funding-linkedin"
                      aria-invalid={fieldState.invalid}
                      placeholder="https://linkedin.com/in/yourprofile"
                      autoComplete="url"
                      className="text-xs xl:text-sm"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="orcid"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="research-funding-orcid">
                      ORCID Profile
                    </FieldLabel>
                    <Input
                      {...field}
                      id="research-funding-orcid"
                      aria-invalid={fieldState.invalid}
                      placeholder="https://orcid.org/yourid"
                      autoComplete="url"
                      className="text-xs xl:text-sm"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="researchgate"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="research-funding-researchgate">
                      ResearchGate Profile
                    </FieldLabel>
                    <Input
                      {...field}
                      id="research-funding-researchgate"
                      aria-invalid={fieldState.invalid}
                      placeholder="https://researchgate.net/profile/yourprofile"
                      autoComplete="url"
                      className="text-xs xl:text-sm"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="scholar"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="research-funding-scholar">
                      Google Scholar Profile
                    </FieldLabel>
                    <Input
                      {...field}
                      id="research-funding-scholar"
                      aria-invalid={fieldState.invalid}
                      placeholder="https://scholar.google.com/citations?user=yourid"
                      autoComplete="url"
                      className="text-xs xl:text-sm"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
                </div>

              

                <div  className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Research Details */}
              <Controller
                name="categoryId"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="research-funding-category">
                      Research Category
                      <span className="text-red-500">*</span>
                    </FieldLabel>
                    {isLoading ? (
                      <SelectSkeleton />
                    ) : (
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger id="research-funding-category" className="w-full" aria-invalid={fieldState.invalid}>
                          <SelectValue placeholder="Select a research category" className="text-xs xl:text-sm" />
                        </SelectTrigger>
                        <SelectContent>
                          {data?.map((category) => (
                            <SelectItem key={category._id} value={category._id} className="text-xs xl:text-sm">
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              <Controller
                name="minorResearchArea"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="research-funding-minor">
                      Minor Research Area
                      <span className="text-red-500">*</span>
                    </FieldLabel>
                    <Input
                      {...field}
                      id="research-funding-minor"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your minor research area"
                      autoComplete="off"
                      className="text-xs xl:text-sm"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
                </div>

            

              <Controller
                name="fundingAmount"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="research-funding-amount">
                      Funding Amount
                      <span className="text-red-500">*</span>
                    </FieldLabel>
                    <Input
                    type="number"
                      {...field}
                      id="research-funding-amount"
                      aria-invalid={fieldState.invalid}
                      placeholder="0"
                      autoComplete="off"
                      className="text-xs xl:text-sm"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
  name="howCanYouContribute"
  control={form.control}
  render={({ field, fieldState }) => {
    const isOther = field.value === "I can contribute in another way" || 
      (field.value !== "" && !typeofContributions?.some(t => t.value === field.value));

    return (
      <Field data-invalid={fieldState.invalid}>
        <FieldLabel htmlFor="research-funding-contribution">
          How can you contribute?
          <span className="text-red-500">*</span>
        </FieldLabel>
        <Select
          onValueChange={(val) => {
            field.onChange(val);
          }}
          value={isOther ? "I can contribute in another way" : field.value}
        >
          <SelectTrigger id="research-funding-contribution" className="w-full" aria-invalid={fieldState.invalid}>
            <SelectValue placeholder="Select how you can contribute" className="text-xs xl:text-sm" />
          </SelectTrigger>
          <SelectContent>
            {typeofContributions?.map((type) => (
              <SelectItem key={type.id} value={type.value}>
                {type.value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {isOther && (
          <>
            <FieldLabel htmlFor="research-funding-contribution-other" className="mt-2">
              Contribution details
              <span className="text-red-500">*</span>
            </FieldLabel>
            <Input
              id="research-funding-contribution-other"
              aria-invalid={fieldState.invalid}
              placeholder="Explain how you can contribute to this research"
              onChange={(e) => field.onChange(e.target.value)}
              onBlur={field.onBlur}
              ref={field.ref}
              value={isOther && field.value !== "I can contribute in another way" ? field.value : ""}
              className="text-xs xl:text-sm"
            />
          </>
        )}

        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
      </Field>
    );
  }}
/>
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
            <Field orientation={'responsive'}>
                <Button type="button" variant="outline" onClick={() => form.reset()} disabled={createMutation.isPending}>
                    Cancel
                </Button>
                <Button type="submit" form="research-funding-submission" variant={'add'} disabled={createMutation.isPending}>
                    {createMutation.isPending ? <ButtonLoader text="Submitting"/> : 'Submit'}
                </Button>
            </Field>
        </CardFooter>
    </Card>
  )
}

export default ResearchFundingForm