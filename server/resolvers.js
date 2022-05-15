import {Company ,Job} from './db.js'

function rejectIf(condition){
    if(condition){
        throw new Error();
    }
}

function delay(ms){
    return new Promise((resolve) => {
        setTimeout(resolve,ms);
    });
}

export const resolvers = {
    Query:{
        company: (_root,{id}) => Company.findById(id),
        job: (_root,{id}) => Job.findById(id),
        jobs: ()=> Job.findAll(),
    },

    Mutation: {
        createJob: async (_root,{input}, {user}) => {
            rejectIf(!user);
            await delay(2000);
            const {companyId} = user;
            return Job.create({...input, companyId});
    },
        deleteJob: async (_root,{id},{user}) =>{
            rejectIf(!user);
            const job = await Job.findById(id);
            rejectIf( job.companyId !== user.companyId);

            return Job.delete(id);
        },
        updateJob: async (_root,{input},{user}) => {
            rejectIf(!user);
            const job = await Job.findById(input.id);
            rejectIf(job.companyId !== user.companyId);
            const {companyId} = user;
            return Job.update({...input,companyId});

        },
    },

    Company: {
        jobs: (company) => {
            return Job.findAll((job) => job.companyId === company.id )
        },
    },

    Job: {
      company: ({companyId})=> {
          return Company.findById(companyId);
      },
    },
};

