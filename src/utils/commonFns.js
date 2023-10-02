const Counter = require('../models/Counter');

exports.createBookingNumber = async ()=>{

    try {
        
        const counterFromDb = await  Counter.findOne({});
        if(!counterFromDb)
        {
            const counterObj = new Counter({
                count:1
            })

            await counterObj.save();
            return 1;
        } 
        let count = counterFromDb.count;
        counterFromDb.count ++;
        await counterFromDb.save();

        return count;


    } catch (error) {
        console.log(error);
        throw error;
    }

}