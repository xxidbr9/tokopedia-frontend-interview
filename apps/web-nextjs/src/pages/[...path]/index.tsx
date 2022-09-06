import { GetServerSideProps } from 'next';
const DetailPage = () => {
  return (
    <div>
      Enter
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {
      data: null
    }
  }
}

export default DetailPage;