import React, { useState } from 'react'
import { Typography, Button, Form, message, Input, Icon } from 'antd';
import FileUpload from '../../utils/FileUpload'
import Axios from 'axios';
const { Title } = Typography;
const { TextArea } = Input;

const Continents = [
    { key: 1, value: "DITU" },
    { key: 2, value: "Graphic Era" },
    { key: 3, value: "UPES" }
]

function UploadPropertyPage(props) {

    const [TitleValue, setTitleValue] = useState("")
    const [DescriptionValue, setDescriptionValue] = useState("")
    const [PriceValue, setPriceValue] = useState(0)
    const [ContactValue, setContactValue] = useState(0)
    const [AddressValue, setAddressValue] = useState("")
    const [ContinentValue, setContinentValue] = useState(1)

    const [Images, setImages] = useState([])

    const onTitleChange = (event) => {
        setTitleValue(event.currentTarget.value)
    }

    const onDescriptionChange = (event) => {
        setDescriptionValue(event.currentTarget.value)
    }

    const onPriceChange = (event) => {
        setPriceValue(event.currentTarget.value)
    }
    const onContactChange = (event) => {
        setContactValue(event.currentTarget.value)
    }

    const onAddressChange = (event) => {
        setAddressValue(event.currentTarget.value)
    }

    const onContinentsSelectChange = (event) => {
        setContinentValue(event.currentTarget.value)
    }

    const updateImages = (newImages) => {
        console.log(newImages);

        setImages(newImages)
    }

    const onSubmit = (event) => {
        event.preventDefault();

        if (!TitleValue || !DescriptionValue || !PriceValue ||!ContactValue ||
            !AddressValue||!ContinentValue || !Images) {
            return alert('fill all the fields first!')
        }

        const variables = {
            writer: props.user.userData._id,
            title: TitleValue,
            description: DescriptionValue,
            price: PriceValue,
            contact:ContactValue,
            address:AddressValue,
            images:Images,
            continents: ContinentValue,
        }


        Axios.post('/api/property/uploadProperty', variables)
            .then(response => {
                if (response.data.success) {
                    alert('Property Successfully Uploaded')
                    props.history.push('/')
                } else {
                    alert('Failed to upload Property')
                }
            })

    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h2>Upload Your Property</h2>
            </div>

            <Form onSubmit={onSubmit} >

                {/* DropZone */}
                <FileUpload refreshFunction={updateImages} />

                <br />
                <br />
                <label>Title</label>
                <Input
                    onChange={onTitleChange}
                    value={TitleValue}
                />
                <br />
                <br />
                <label>Description</label>
                <TextArea
                    onChange={onDescriptionChange}
                    value={DescriptionValue}
                />
                <br />
                <br />
                <label>Price(Rs.)</label>
                <Input
                    onChange={onPriceChange}
                    value={PriceValue}
                    type="number"
                />
                <br />
                <br />
                <label>Contact</label>
                <Input
                    onChange={onContactChange}
                    value={ContactValue}
                    type="number"
                />
                <br />
                <br />
                <label>Address</label>
                <TextArea
                    onChange={onAddressChange}
                    value={AddressValue}
                />
                <br />
                <br />
                <select onChange={onContinentsSelectChange} value={ContinentValue}>
                    {Continents.map(item => (
                        <option key={item.key} value={item.key}>{item.value} </option>
                    ))}
                </select>
                <br />
                <br />

                <Button
                    onClick={onSubmit}
                >
                    Submit
                </Button>

            </Form>

        </div>
    )
}

export default UploadPropertyPage
