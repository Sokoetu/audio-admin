
export function customUseEffect(callback: () => void, setLoading?: React.Dispatch<boolean>, timer?: number) {
    let mounted = true;
    if (mounted) {
      callback();

      if (setLoading) setTimeout(() => setLoading(false), timer || 1500)
    }  
    return () => {
     if (mounted) mounted = false;
    };
 }