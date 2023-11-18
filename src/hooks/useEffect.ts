//  a useEffect-like HOC, that helps with calling the attached function, and seting loading to false
export async function customUseEffect(callback: () => void, setLoading?: React.Dispatch<boolean>, timer?: number) {
    await callback();
    if (setLoading) setTimeout(() => setLoading(false), timer || 1500)
     
 }