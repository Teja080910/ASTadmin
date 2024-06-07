import { Button, Input, Stack } from '@chakra-ui/react';
import { FileInput, Label, Select } from "flowbite-react";
import { AllMaterials } from "./allmaterials";
export const BootcampMaterial = () => {
    return (
        <div className="bootmati">
            <div className="mati">
                <div className="matform">
                    <div>
                        <div>
                            <Label htmlFor="file-upload-helper-text" value="Upload photos" />
                        </div>
                        <FileInput id="file-upload-helper-text" accept=".png,.svg,.web,.jpg,.jpeg" helperText="SVG, PNG, JPG or GIF." />
                    </div>
                    <div>
                        <div>
                            <Label htmlFor="multiple-file-upload" value="Upload files" />
                        </div>
                        <FileInput id="multiple-file-upload" accept=".pdf,.docx,.txt,.xlsx" helperText="PDF, DOCX, TXT, XLSX." />
                    </div>
                    <div className="file-inputs">
                        <Stack spacing={8}>
                            <Input placeholder='Enter material name' size='lg' />
                            <Select placeholder='Select option'>
                                <option>Select Theme</option>
                                <option value='HTML'>HTML</option>
                                <option value='CSS'>CSS</option>
                                <option value='JAVASCRIPT'>JAVASCRIPT</option>
                                <option value='REACT'>REACT</option>
                                <option value='NODE'>NODE</option>
                                <option value='MONGODB'>MONGODB</option>
                            </Select>
                            <Button colorScheme='cyan'>Upload</Button>
                        </Stack>
                    </div>
                </div>
            </div>
            <div className="allmetirials">
            <div className="allmeti">
                <AllMaterials />
            </div>
            </div>
        </div>
    )
}