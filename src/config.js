// TESTNET CREDENTIALS
// console.log(window.env);
// put .env under the main folder not React folder
const id = window.env.ID;
// console.log(id)
const pb_key = window.env.PB_KEY;
const pvkey = window.env.PVKEY;
const operator = {
	id: id,
	pb_key: pb_key,
	pvkey: pvkey
};

export default operator;
