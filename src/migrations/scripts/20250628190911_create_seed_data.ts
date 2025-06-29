// Libraries
import DayJS from "dayjs";
import type { Knex } from "knex";

// Constants
import { TABLE_NAME } from "../../constants/table-names";
import { USER_TYPE } from "../../constants/user-types";
import { EXPENSE_STATUS_TYPE } from "../../constants/expense-status-types";

// Utilities
import { getRandomInt } from "../../utilities/seed-helpers";

export async function up(knex: Knex): Promise<void> {
  await knex(TABLE_NAME.TEAM).insert([
    "Admin",
    "Finance",
    "Sales",
    "Design",
    "Marketing",
    "IT & Support",
    "Engineering",
    "Human Resource",
  ].map(name => ({ name })));
  const teams = await knex(TABLE_NAME.TEAM).select(
    'id',
    'name',
  );

  await knex(TABLE_NAME.USER_TYPE).insert(
    Object.values(USER_TYPE).map(name => ({ name }))
  );
  const userTypes = await knex(TABLE_NAME.USER_TYPE).select(
    'id',
    'name',
  );
  const adminTypeId = userTypes.find(type => type.name === USER_TYPE.ADMINISTRATOR).id;
  const employeeTypeId = userTypes.find(type => type.name === USER_TYPE.EMPLOYEE).id;

  const todayTimestamp = DayJS();

  let admins = [
    { name: "Liam Bennett", email: "liam.bennett@arkahalder.com" },
    { name: "Emma Foster", email: "emma.foster@arkahalder.com" },
    { name: "Aarav Sharma", email: "aarav.sharma@arkahalder.com" },
    { name: "Riya Mukherjee", email: "riya.mukherjee@arkahalder.com" },
    { name: "Juan Dela Cruz", email: "juan.delacruz@arkahalder.com" },
  ].map(user => ({
    ...user,
    type_id: adminTypeId,
    joined_at: DayJS(todayTimestamp).subtract(5, "years").subtract(getRandomInt(30, 1), "days").subtract(getRandomInt(86400, 1), "seconds").toISOString(),
  }));
  const maxAdminJoinDate = DayJS(Math.max(...admins.map(admin => DayJS(admin.joined_at).valueOf())));
  const differenceDays = todayTimestamp.diff(maxAdminJoinDate, "days") - 10;
  let employees = [
    { name: "James Howard", email: "james.howard@arkahalder.com" },
    { name: "Olivia Clark", email: "olivia.clark@arkahalder.com" },
    { name: "Noah Hayes", email: "noah.hayes@arkahalder.com" },
    { name: "Ava Turner", email: "ava.turner@arkahalder.com" },
    { name: "Ethan Russell", email: "ethan.russell@arkahalder.com" },
    { name: "Charlotte Bryant", email: "charlotte.bryant@arkahalder.com" },
    { name: "Mason Reed", email: "mason.reed@arkahalder.com" },
    { name: "Amelia Griffin", email: "amelia.griffin@arkahalder.com" },
    { name: "Logan Barker", email: "logan.barker@arkahalder.com" },
    { name: "Scarlett Todd", email: "scarlett.todd@arkahalder.com" },
    { name: "Isha Mehta", email: "isha.mehta@arkahalder.com" },
    { name: "Rohan Verma", email: "rohan.verma@arkahalder.com" },
    { name: "Ananya Reddy", email: "ananya.reddy@arkahalder.com" },
    { name: "Vivaan Iyer", email: "vivaan.iyer@arkahalder.com" },
    { name: "Diya Kapoor", email: "diya.kapoor@arkahalder.com" },
    { name: "Kunal Bansal", email: "kunal.bansal@arkahalder.com" },
    { name: "Sneha Joshi", email: "sneha.joshi@arkahalder.com" },
    { name: "Aditya Nair", email: "aditya.nair@arkahalder.com" },
    { name: "Pooja Chatterjee", email: "pooja.chatterjee@arkahalder.com" },
    { name: "Yash Patil", email: "yash.patil@arkahalder.com" },
    { name: "Arjun Desai", email: "arjun.desai@arkahalder.com" },
    { name: "Neha Kulkarni", email: "neha.kulkarni@arkahalder.com" },
    { name: "Dev Singh", email: "dev.singh@arkahalder.com" },
    { name: "Meera Jain", email: "meera.jain@arkahalder.com" },
    { name: "Siddharth Rao", email: "siddharth.rao@arkahalder.com" },
    { name: "Tanvi Pillai", email: "tanvi.pillai@arkahalder.com" },
    { name: "Kabir Dutta", email: "kabir.dutta@arkahalder.com" },
    { name: "Aanya Bhatt", email: "aanya.bhatt@arkahalder.com" },
    { name: "Maria Santos", email: "maria.santos@arkahalder.com" },
    { name: "Jose Ramos", email: "jose.ramos@arkahalder.com" },
    { name: "Angelica Reyes", email: "angelica.reyes@arkahalder.com" },
    { name: "Mark Villanueva", email: "mark.villanueva@arkahalder.com" },
    { name: "Grace Bautista", email: "grace.bautista@arkahalder.com" },
    { name: "Paolo Garcia", email: "paolo.garcia@arkahalder.com" },
    { name: "Kristine Mendoza", email: "kristine.mendoza@arkahalder.com" },
  ].map(employee => ({
    ...employee,
    type_id: employeeTypeId,
    joined_at: DayJS(todayTimestamp).subtract(getRandomInt(differenceDays), "days").subtract(getRandomInt(86400, 1), "seconds").toISOString(),
  }));
  await knex(TABLE_NAME.USER).insert([
    ...admins,
    ...employees,
  ]);
  admins = await knex(TABLE_NAME.USER).select(
    'id',
    'name',
  ).where(
    'type_id',
    adminTypeId,
  );
  employees = await knex(TABLE_NAME.USER).select(
    'id',
    'name',
    'joined_at',
  ).where(
    'type_id',
    employeeTypeId,
  );

  await knex(TABLE_NAME.USER_TEAM).insert(employees.map(employee => {
    const teamsCount = getRandomInt(2, 1);
    const teamIds: string[] = [];
    while (teamIds.length < teamsCount) {
      const teamIndex = getRandomInt(teams.length);
      const teamId = teams[teamIndex].id;
      if (!teamIds.includes(teamId)) {
        teamIds.push(teamId);
      }
    }
    return teamIds.map(teamId => ({
      team_id: teamId,
      user_id: employee.id,
    }));
  }).flat());
  const userTeams = await knex(TABLE_NAME.USER_TEAM).select('*');

  await knex(TABLE_NAME.EXPENSE_TYPE).insert([
    "Transport",
    "Fooding",
    "Subscription",
    "Stationary",
    "Internet",
    "Medical",
  ].map(name => ({ name })));
  const expenseTypes = await knex(TABLE_NAME.EXPENSE_TYPE).select(
    'id',
    'name',
  );

  await knex(TABLE_NAME.EXPENSE_STATUS).insert(
    Object.values(EXPENSE_STATUS_TYPE).map(name => ({ name }))
  );
  const expenseStatuses = await knex(TABLE_NAME.EXPENSE_STATUS).select(
    'id',
    'name',
  );
  const pendingStatusId = expenseStatuses.find(status => status.name === EXPENSE_STATUS_TYPE.PENDING).id;
  const approvedStatusId = expenseStatuses.find(status => status.name === EXPENSE_STATUS_TYPE.APPROVED).id;
  const rejectedStatusId = expenseStatuses.find(status => status.name === EXPENSE_STATUS_TYPE.REJECTED).id;

  const expenses = employees.map(employee => {
    const employeeTeams = userTeams.filter(userTeam => userTeam.user_id === employee.id);
    let employeeExpenses = [];
    let expenseTimestamp = DayJS(employee.joined_at).add(getRandomInt(15), "days").add(getRandomInt(86400, 1), "seconds");
    while (expenseTimestamp.isBefore(todayTimestamp)) {
      const expenseType = expenseTypes[getRandomInt(expenseTypes.length)];
      const expenseStatusId = todayTimestamp.diff(expenseTimestamp, "days") < 30 ? pendingStatusId : getRandomInt(2) === 0 ? approvedStatusId : rejectedStatusId;
      const employeeExpense = {
        team_id: employeeTeams[getRandomInt(employeeTeams.length)].team_id,
        requestor_id: employee.id,
        approver_id: admins[getRandomInt(admins.length)].id,
        type_id: expenseType.id,
        status_id: expenseStatusId,
        name: `Expense for ${expenseType.name}`,
        amount: getRandomInt(10000, 500),
        requested_at: expenseTimestamp.toISOString(),
      };
      if (employeeExpense.status_id === approvedStatusId) {
        employeeExpense.approved_at = DayJS(employeeExpense.requested_at).add(getRandomInt(3, 1), "days").add(getRandomInt(86400, 1), "seconds").toISOString();
      }
      if (employeeExpense.status_id === rejectedStatusId) {
        employeeExpense.rejected_at = DayJS(employeeExpense.requested_at).add(getRandomInt(3, 1), "days").add(getRandomInt(86400, 1), "seconds").toISOString();
      }
      employeeExpenses.push(employeeExpense);
      expenseTimestamp = DayJS(expenseTimestamp).add(getRandomInt(15), "days").add(getRandomInt(86400, 1), "seconds");
    }
    return employeeExpenses;
  }).flat();

  await knex(TABLE_NAME.EXPENSE).insert(expenses);
};

export async function down(knex: Knex): Promise<void> {};
