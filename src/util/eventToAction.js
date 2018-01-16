/**
 * Created by sandeep on 16/01/2018.
 */
export default function eventToAction(dispatchAction) {
  return (e) => {
    dispatchAction(e.currentTarget.value);
  }
}