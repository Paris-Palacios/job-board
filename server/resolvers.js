import {Company ,Job} from './db.js'

export const resolvers = {
    Query:{
        company: (_root,{id}) => Company.findById(id),
        job: (_root,{id}) => Job.findById(id),
        jobs: ()=> Job.findAll()
    },

    Job: {
      company: ({companyId})=> {
          return Company.findById(companyId);
      },
    },
};

