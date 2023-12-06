import React, {useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { requestPermission, onMessageListener } from '../firebase';

function Notification() {
  useEffect(() => {
    requestPermission();
    const unsubscribe = onMessageListener().then((payload) => {
      console.log(payload.data.title)
      toast.success(`${payload?.data?.title}: ${payload?.data?.body}`, {
        duration: 50000, 
        position: 'top-right', 
      });
});
    return () => {
      unsubscribe.catch((err) => console.log('failed: ', err));
    };
  }, []);
  return (
    <div>
      <Toaster />
    </div>
  );
}
export default Notification;