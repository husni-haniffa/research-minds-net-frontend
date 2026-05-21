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
import { formSchema, ResearchHelpsFormProps, typeofContributions } from "./types"
import { SelectSkeleton } from "@/features/user/submissions/Skeleton"
import { useCreateResearchHelps } from "./helps.hooks"


const ResearchHelpsForm = ({ onSuccess } : ResearchHelpsFormProps) => {

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
      degree:"",
      categoryId: "",
      minorResearchArea: "",
      howCanYouContribute: ""
    },
  })

  const createMutation = useCreateResearchHelps(() => {
    form.reset()
    onSuccess?.()
  })

  const { data, isLoading, error } = useCategories()

  if (error instanceof Error) return <AlertError message={error.message}/>

  return (
    <Card className="w-full border-0 shadow-none">
      <CardHeader>
        <CardTitle>Research Helps</CardTitle>
        <CardDescription>Get help and support for your research projects</CardDescription>
      </CardHeader>
        <CardContent>
          <form id="research-helps-submission" onSubmit={form.handleSubmit((v) => createMutation.mutate(v))}>
            <FieldGroup>
              {/* Personal Information */}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="research-helps-title">
                      Title
                      <span className="text-red-500">*</span>
                    </FieldLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger id="research-helps-title" className="w-full" aria-invalid={fieldState.invalid}>
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
                    <FieldLabel htmlFor="research-helps-name">
                      Full Name
                      <span className="text-red-500">*</span>
                    </FieldLabel>
                    <Input
                      {...field}
                      id="research-helps-name"
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
                    <FieldLabel htmlFor="research-helps-designation">
                      Designation
                      <span className="text-red-500">*</span>
                    </FieldLabel>
                    <Input
                      {...field}
                      id="research-helps-designation"
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
                    <FieldLabel htmlFor="research-helps-affiliation">
                      Institution / Affiliation
                      <span className="text-red-500">*</span>
                    </FieldLabel>
                    <Input
                      {...field}
                      id="research-helps-affiliation"
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
                    <FieldLabel htmlFor="research-helps-degree">
                      Degree
                      <span className="text-red-500">*</span>
                    </FieldLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger id="research-helps-degree" className="w-full" aria-invalid={fieldState.invalid}>
                          <SelectValue placeholder="Select your degree" className="text-xs xl:text-sm" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem key='Bachelor' value='Bachelor' className="text-xs xl:text-sm">
                              Bachelor
                            </SelectItem>
                             <SelectItem key='Master' value='Master' className="text-xs xl:text-sm">
                              Master
                            </SelectItem>
                             <SelectItem key='MPhil' value='MPhil' className="text-xs xl:text-sm">
                              MPhil
                            </SelectItem>
                             <SelectItem key='PhD' value='PhD' className="text-xs xl:text-sm">
                              PhD
                            </SelectItem>
                               <SelectItem key='PostDoc' value='PostDoc' className="text-xs xl:text-sm">
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
                    <FieldLabel htmlFor="research-helps-mobile">
                      Mobile Number
                      <span className="text-red-500">*</span>
                    </FieldLabel>
                    <Input
                      {...field}
                      id="research-helps-mobile"
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
                    <FieldLabel htmlFor="research-helps-whatsapp">
                      WhatsApp Number
                      <span className="text-red-500">*</span>

                    </FieldLabel>
                    <Input
                      {...field}
                      id="research-helps-whatsapp"
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
                    <FieldLabel htmlFor="research-helps-email">
                      Email Address
                      <span className="text-red-500">*</span>

                    </FieldLabel>
                    <Input
                      {...field}
                      id="research-helps-email"
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
                    <FieldLabel htmlFor="research-helps-linkedin">
                      LinkedIn Profile
                    </FieldLabel>
                    <Input
                      {...field}
                      id="research-helps-linkedin"
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
                    <FieldLabel htmlFor="research-helps-orcid">
                      ORCID Profile
                    </FieldLabel>
                    <Input
                      {...field}
                      id="research-helps-orcid"
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
                    <FieldLabel htmlFor="research-helps-researchgate">
                      ResearchGate Profile
                    </FieldLabel>
                    <Input
                      {...field}
                      id="research-helps-researchgate"
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
                    <FieldLabel htmlFor="research-helps-scholar">
                      Google Scholar Profile
                    </FieldLabel>
                    <Input
                      {...field}
                      id="research-helps-scholar"
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

                <div  className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Research Details */}
              <Controller
                name="categoryId"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="research-helps-category">
                      Research Category
                      <span className="text-red-500">*</span>
                    </FieldLabel>
                    {isLoading ? (
                      <SelectSkeleton />
                    ) : (
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger id="research-helps-category" className="w-full" aria-invalid={fieldState.invalid}>
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
                    <FieldLabel htmlFor="research-helps-minor">
                      Minor Research Area
                      <span className="text-red-500">*</span>
                    </FieldLabel>
                    <Input
                      {...field}
                      id="research-helps-minor"
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
  name="howCanYouContribute"
  control={form.control}
  render={({ field, fieldState }) => {
    const isOther = field.value === "I can contribute in another way" || 
      (field.value !== "" && !typeofContributions?.some(t => t.value === field.value));

    return (
      <Field data-invalid={fieldState.invalid}>
        <FieldLabel htmlFor="research-helps-contribution">
          How can you contribute?
          <span className="text-red-500">*</span>
        </FieldLabel>
        <Select
          onValueChange={(val) => {
            field.onChange(val);
          }}
          value={isOther ? "I can contribute in another way" : field.value}
        >
          <SelectTrigger id="research-helps-contribution" className="w-full" aria-invalid={fieldState.invalid}>
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
            <FieldLabel htmlFor="research-helps-contribution-other" className="mt-2">
              Contribution details
              <span className="text-red-500">*</span>
            </FieldLabel>
            <Input
              id="research-helps-contribution-other"
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
                <Button type="submit" form="research-helps-submission" variant={'add'} disabled={createMutation.isPending}>
                    {createMutation.isPending ? <ButtonLoader text="Submitting"/> : 'Submit'}
                </Button>
            </Field>
        </CardFooter>
    </Card>
  )
}

export default ResearchHelpsForm
