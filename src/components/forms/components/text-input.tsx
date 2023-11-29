import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

import Editor from "./richtext-editor/editor" ; 
import ImageUpload from "./image-upload"; 

interface TextInputProps {
    className?: string; 
    form?: any; 
    name: string, 
    loading?: boolean; 
    placeholder?: string | number; 
    type?: string; 
    textarea?: boolean; 
    editor?: boolean; 
    file?: boolean; 
}

const TextInput: React.FC<TextInputProps> = ({
    className = '', form, 
    name, loading, 
    placeholder = 'Type here...', 
    type = 'text', 
    textarea = false, 
    editor = false,
    file = false,
}) => {
    return (
        <FormField 
            control={form.control}
            name={name}
            render={({ field }: { field: any}) => (
                <FormItem className={`my-4 ${className && className}`}>
                    <FormLabel className='capitalize'>{name}</FormLabel>
                    <FormControl>
                        <>
                            {
                                file && (
                                    <ImageUpload 
                                        disabled={loading}
                                        onChange={(url: string) => {
                                            const updatedValue = [...field.value, url]; 
                                            field.onChange(updatedValue);
                                        }}
                                        onRemove={(url: string) => {
                                            const updatedValue = field.value.filter((imageUrl: string) => imageUrl !== url);
                                            field.onChange(updatedValue);
                                        }}
                                        path={process.env.NODE_ENV === 'production' ? `/blog`: '/test/blogs'}
                                        images={field.value}
                                    />
                                )
                            } 
                            {
                                textarea && (
                                    <Textarea 
                                        className='focus:border-active-color focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0'
                                        disabled={loading}
                                        placeholder={String(placeholder)}
                                        {...field}
                                    />
                                )
                                
                            } 
                            {
                                editor && (
                                    <Editor 
                                        value={field.value}
                                        setValue={field.onChange}
                                        editable={!loading}
                                    />
                                )
                            }
                            {
                                (!file && !editor && !textarea) && (
                                    (
                                        <Input 
                                            className='focus:border-active-color focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0'
                                            disabled={loading}
                                            placeholder={String(placeholder)}
                                            type={type || 'text'}
                                            {...field}
                                        />
        
                                    )
                                )
                            }
                        </>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
)}

export default TextInput; 