import { __Cookie } from "@constants/global.constant";
import { paths } from "@constants/paths.constant";
import { setCookie } from "@helpers/common.helper";
import { styled } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";

const MessageT = styled('h2')({
    fontSize: '50px',
    textAlign: 'center',
    margin: '80px 0'
})

const AbandonedCart: React.FC = () => {
    const router = useRouter()
    const cid = router.query.cid;

    useEffect(() => {
        let pathname = '/';
        if (cid) {
            setCookie(__Cookie.tempCustomerId, '' + cid, 'Session');
            pathname = paths.CART
        }
        router.push({
            pathname,
        })
    }, []);

    return <MessageT>Please Wait Validating URL ...</MessageT>
}

export default AbandonedCart;