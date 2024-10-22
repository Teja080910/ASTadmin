import { Button, Input, Stack, useToast } from '@chakra-ui/react';
import { FileInput, Label, Select } from "flowbite-react";
import { useState } from 'react';
import { Actions } from '../../actions/actions';
import { AllMaterials } from "./allmaterials";

export const BootcampMaterial = () => {
    const [photo, setPhoto] = useState()
    const [file, setFile] = useState()
    const [materialName, setMaterialName] = useState();
    const [theme, setTheme] = useState();
    const [isLoading, setIsLoading] = useState(false)
    const [material, setMaterial] = useState([])
    const [show, setShow] = useState(false)
    const toast = useToast();
    const UploadFile = async () => {
        setIsLoading(true)
        const formData = new FormData();
        if ((file || photo) && materialName && theme) {
            formData.append("photo", photo);
            formData.append("file", file);
            formData.append("materialName", materialName);
            formData.append("theme", theme);
            Actions.UploadMaterials(formData)
                .then((res) => {
                    if (res?.data?.message) {
                        setIsLoading(false)
                        window.location.reload(5)
                        toast({ title: res?.data?.message, status: 'success', position: 'top-right', isClosable: true })
                    }
                    else {
                        setIsLoading(false)
                        toast({ title: res?.data?.error, status: 'error', position: 'bottom-right', isClosable: true })
                    }
                })
                .catch((e) => {
                    setIsLoading(false)
                    toast({ title: e?.message, status: 'error', position: 'bottom-right', isClosable: true })
                })
        }
        else {
            setIsLoading(false)
            toast({ title: "required all fields", status: 'error', position: 'bottom-right', isClosable: true })
        }
    }

    const themeNames = material?.reduce((acc, mat) => {
        if (mat?.Theme && !acc.includes(mat.Theme)) {
            acc.push(mat.Theme);
        }
        return acc;
    }, []);

    return (
        <div className="bootmati">
            <div className="mati">
                <div className="matform">
                    <div>
                        <div>
                            <Label htmlFor="file-upload-helper-text" value="Upload photos" />
                        </div>
                        <FileInput id="file-upload-helper-text" accept=".png,.svg,.web,.jpg,.jpeg" helperText="SVG, PNG, JPG or GIF." onChange={(e) => setPhoto(e.target.files[0])} />
                    </div>
                    <div>
                        <div>
                            <Label htmlFor="multiple-file-upload" value="Upload files" />
                        </div>
                        <FileInput id="multiple-file-upload" accept=".pdf,.docx,.txt,.xlsx" helperText="PDF, DOCX, TXT, XLSX." onChange={(e) => setFile(e.target.files[0])} />
                    </div>
                    <div className="file-inputs">
                        <Stack spacing={8}>
                            <Input placeholder='Enter material name' size='lg' onChange={(e) => setMaterialName(e.target.value)} />
                            {show ? <Input placeholder='Enter Theme' size='lg' onChange={(e) => setTheme(e.target.value)} /> :
                                <Select placeholder='Select option' onChange={(e) => e.target.value === "show" ? setShow(true) : setTheme(e.target.value)}>
                                    <option>Select Theme</option>
                                    <option value={"show"}>Create Theme</option>
                                    {
                                        themeNames?.map((theme) => (
                                            <option val={theme}>{theme}</option>
                                        ))
                                    }
                                </Select>}
                            <Button colorScheme='cyan' onClick={UploadFile}>{isLoading ? "Uploading...." : "Upload"}</Button>
                        </Stack>
                    </div>
                </div>
            </div>
            <div className='deleteall'>
                <Button onClick={() => { Actions.DeleteAllMaterials().then((res) => { toast({ title: res?.data?.message, status: 'success', position: 'top-right', isClosable: true }); window.location.reload(10) }) }} bg="red.600" color="white" size={'sm'}>Delete All</Button>
            </div>
            <div className="allmetirials">
                <div className="allmeti">
                    <AllMaterials materials={(val) => setMaterial(val)} />
                </div>
            </div>
        </div>
    )
}