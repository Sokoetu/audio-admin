
export function customUseEffect(callback: () => void, setLoading, timer) {
    let mounted = true;
    if (mounted) {
      callback();

      if (setLoading) setTimeout(() => setLoading(false), timer || 1500)
    }  
    return () => {
     if (mounted) mounted = false;
    };
 }