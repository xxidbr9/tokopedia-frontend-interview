import styled from "@emotion/styled"
import { useRouter } from "next/router"
import { Typography, Button } from "ui"
import colors from "ui/theme/colors"
import AnyaSmug from '@/assets/images/anya_smug.png'
import Image from "next/image"

// center div element
const CenterDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80vh;
  flex-direction: column;
  row-gap: 20px;
`


type EmptyProps = {
  text?: string
  withButton?: boolean
}

export const Empty: React.FC<EmptyProps> = (props) => {
  const router = useRouter()
  return (
    <CenterDiv>
      <Image alt="anya smug" src={AnyaSmug} layout="fixed" width={500} height={500} />
      <Typography.Text style={{ color: colors.textSecondary, textAlign: "center" }}>
        {props.text || "Belum ada data"}
      </Typography.Text>
      <div>
        <Button onClick={() => router.push("/")}>
          Kembali ke beranda
        </Button>
      </div>
    </CenterDiv>
  )
}

Empty.defaultProps = {
  withButton: true
}