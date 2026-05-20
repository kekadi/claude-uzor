import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Users
  const adminPw = await bcrypt.hash('Admin2024!', 12)
  const superPw = await bcrypt.hash('Super2024!', 12)
  const staffPw = await bcrypt.hash('Staff2024!', 12)
  const staff2Pw = await bcrypt.hash('Staff2024!', 12)

  const admin = await prisma.user.upsert({
    where: { email: 'admin@burlesongp.com' },
    update: {},
    create: {
      email: 'admin@burlesongp.com',
      password: adminPw,
      name: 'Practice Administrator',
      role: 'admin',
      title: 'Practice Manager'
    }
  })

  const supervisor = await prisma.user.upsert({
    where: { email: 'supervisor@burlesongp.com' },
    update: {},
    create: {
      email: 'supervisor@burlesongp.com',
      password: superPw,
      name: 'Mary Johnson',
      role: 'supervisor',
      title: 'Referral Supervisor'
    }
  })

  const staff1 = await prisma.user.upsert({
    where: { email: 'staff@burlesongp.com' },
    update: {},
    create: {
      email: 'staff@burlesongp.com',
      password: staffPw,
      name: 'Sarah Williams',
      role: 'staff',
      title: 'Referral Coordinator'
    }
  })

  const staff2 = await prisma.user.upsert({
    where: { email: 'staff2@burlesongp.com' },
    update: {},
    create: {
      email: 'staff2@burlesongp.com',
      password: staff2Pw,
      name: 'James Martinez',
      role: 'staff',
      title: 'DME Coordinator'
    }
  })

  console.log('Users created')

  // Patients
  const patients = await Promise.all([
    prisma.patient.upsert({
      where: { mrn: 'BGP-001001' },
      update: {},
      create: {
        mrn: 'BGP-001001',
        firstName: 'Dorothy',
        lastName: 'Anderson',
        dob: '1942-03-15',
        phone: '817-555-0101',
        address: '214 Oak Meadow Dr',
        city: 'Burleson',
        state: 'TX',
        zip: '76028',
        primaryIns: 'Medicare',
        insId: 'MA123456789',
        provider: 'Dr. Robert Chen',
        ecwId: 'ECW-001001'
      }
    }),
    prisma.patient.upsert({
      where: { mrn: 'BGP-001002' },
      update: {},
      create: {
        mrn: 'BGP-001002',
        firstName: 'Harold',
        lastName: 'Thompson',
        dob: '1938-07-22',
        phone: '817-555-0102',
        address: '567 Briaroaks Rd',
        city: 'Burleson',
        state: 'TX',
        zip: '76028',
        primaryIns: 'Medicare',
        insId: 'MB987654321',
        secondaryIns: 'AARP Supplement',
        provider: 'Dr. Robert Chen',
        ecwId: 'ECW-001002'
      }
    }),
    prisma.patient.upsert({
      where: { mrn: 'BGP-001003' },
      update: {},
      create: {
        mrn: 'BGP-001003',
        firstName: 'Mildred',
        lastName: 'Garcia',
        dob: '1945-11-08',
        phone: '817-555-0103',
        address: '89 Wilshire Blvd',
        city: 'Burleson',
        state: 'TX',
        zip: '76028',
        primaryIns: 'Medicare',
        insId: 'MC456789012',
        secondaryIns: 'Medicaid',
        provider: 'Dr. Lisa Patel',
        ecwId: 'ECW-001003'
      }
    }),
    prisma.patient.upsert({
      where: { mrn: 'BGP-001004' },
      update: {},
      create: {
        mrn: 'BGP-001004',
        firstName: 'Eugene',
        lastName: 'Wilson',
        dob: '1936-04-30',
        phone: '817-555-0104',
        address: '342 Alsbury Blvd',
        city: 'Burleson',
        state: 'TX',
        zip: '76028',
        primaryIns: 'Humana Medicare Advantage',
        insId: 'HA789012345',
        provider: 'Dr. Lisa Patel',
        ecwId: 'ECW-001004'
      }
    }),
    prisma.patient.upsert({
      where: { mrn: 'BGP-001005' },
      update: {},
      create: {
        mrn: 'BGP-001005',
        firstName: 'Beatrice',
        lastName: 'Johnson',
        dob: '1948-09-17',
        phone: '817-555-0105',
        address: '118 Renfro St',
        city: 'Burleson',
        state: 'TX',
        zip: '76028',
        primaryIns: 'UnitedHealthcare Medicare Advantage',
        insId: 'UH345678901',
        provider: 'Dr. Robert Chen',
        ecwId: 'ECW-001005'
      }
    }),
    prisma.patient.upsert({
      where: { mrn: 'BGP-001006' },
      update: {},
      create: {
        mrn: 'BGP-001006',
        firstName: 'Walter',
        lastName: 'Davis',
        dob: '1940-12-03',
        phone: '817-555-0106',
        address: '455 NE Tarrant Rd',
        city: 'Burleson',
        state: 'TX',
        zip: '76028',
        primaryIns: 'Medicare',
        insId: 'MD234567890',
        provider: 'Dr. Robert Chen',
        ecwId: 'ECW-001006'
      }
    })
  ])

  console.log('Patients created')

  const now = new Date()
  const daysAgo = (d: number) => new Date(now.getTime() - d * 86400000)
  const daysFromNow = (d: number) => new Date(now.getTime() + d * 86400000)

  // Referrals
  await Promise.all([
    prisma.referral.upsert({
      where: { refNumber: 'REF-2024-001' },
      update: {},
      create: {
        refNumber: 'REF-2024-001',
        patientId: patients[0].id,
        assignedToId: staff1.id,
        referringProvider: 'Dr. Robert Chen',
        specialty: 'Cardiology',
        specialist: 'Dr. Michael Torres - JPS Cardiology',
        urgency: 'Routine',
        status: 'Scheduled',
        diagnosis: 'Heart failure with reduced ejection fraction',
        icdCode: 'I50.20',
        payer: 'Medicare',
        authRequired: true,
        authNumber: 'AUTH-MC-78901',
        notes: 'Patient has been dyspneic, EF 35% on echo. Needs cardiology follow-up.',
        dateOrdered: daysAgo(18),
        dateSent: daysAgo(16),
        dateScheduled: daysFromNow(5)
      }
    }),
    prisma.referral.upsert({
      where: { refNumber: 'REF-2024-002' },
      update: {},
      create: {
        refNumber: 'REF-2024-002',
        patientId: patients[1].id,
        assignedToId: staff1.id,
        referringProvider: 'Dr. Robert Chen',
        specialty: 'Orthopedics',
        specialist: 'Dr. James Ortega - Burleson Bone & Joint',
        urgency: 'Routine',
        status: 'Pending',
        diagnosis: 'Osteoarthritis of knee, bilateral',
        icdCode: 'M17.0',
        payer: 'Medicare',
        authRequired: false,
        notes: 'Patient requesting knee replacement evaluation. Fall risk assessment recommended.',
        dateOrdered: daysAgo(16),
        dueDate: daysFromNow(1)
      }
    }),
    prisma.referral.upsert({
      where: { refNumber: 'REF-2024-003' },
      update: {},
      create: {
        refNumber: 'REF-2024-003',
        patientId: patients[2].id,
        assignedToId: staff1.id,
        referringProvider: 'Dr. Lisa Patel',
        specialty: 'Neurology',
        specialist: '',
        urgency: 'Urgent',
        status: 'Sent',
        diagnosis: 'Cognitive impairment, dementia evaluation',
        icdCode: 'G31.84',
        payer: 'Medicare',
        authRequired: true,
        notes: 'Significant cognitive decline noted. MMSE 18/30. Urgent neurology evaluation needed.',
        dateOrdered: daysAgo(5),
        dateSent: daysAgo(3),
        dueDate: daysFromNow(3)
      }
    }),
    prisma.referral.upsert({
      where: { refNumber: 'REF-2024-004' },
      update: {},
      create: {
        refNumber: 'REF-2024-004',
        patientId: patients[3].id,
        assignedToId: staff2.id,
        referringProvider: 'Dr. Lisa Patel',
        specialty: 'Ophthalmology',
        specialist: 'Dr. Karen Lee - Clear Vision Eye Care',
        urgency: 'Routine',
        status: 'Completed',
        diagnosis: 'Diabetic retinopathy',
        icdCode: 'E11.319',
        payer: 'Humana Medicare Advantage',
        authRequired: true,
        authNumber: 'HUM-2024-45678',
        dateOrdered: daysAgo(30),
        dateSent: daysAgo(28),
        dateScheduled: daysAgo(14),
        dateCompleted: daysAgo(14)
      }
    }),
    prisma.referral.upsert({
      where: { refNumber: 'REF-2024-005' },
      update: {},
      create: {
        refNumber: 'REF-2024-005',
        patientId: patients[4].id,
        assignedToId: staff1.id,
        referringProvider: 'Dr. Robert Chen',
        specialty: 'Pulmonology',
        specialist: '',
        urgency: 'Urgent',
        status: 'Denied',
        diagnosis: 'COPD with acute exacerbation',
        icdCode: 'J44.1',
        payer: 'UnitedHealthcare Medicare Advantage',
        authRequired: true,
        notes: 'Denied - not medically necessary per UHC criteria. Initiating P2P.',
        denialReason: 'Not medically necessary per clinical criteria',
        dateOrdered: daysAgo(10),
        dateSent: daysAgo(8)
      }
    }),
    prisma.referral.upsert({
      where: { refNumber: 'REF-2024-006' },
      update: {},
      create: {
        refNumber: 'REF-2024-006',
        patientId: patients[5].id,
        assignedToId: staff2.id,
        referringProvider: 'Dr. Robert Chen',
        specialty: 'Endocrinology',
        specialist: 'Dr. Priya Sharma - Diabetes & Hormone Center',
        urgency: 'Routine',
        status: 'Pending',
        diagnosis: 'Type 2 diabetes mellitus, uncontrolled',
        icdCode: 'E11.65',
        payer: 'Medicare',
        authRequired: false,
        notes: 'HbA1c 10.2% despite maximum oral therapy. Insulin initiation guidance needed.',
        dateOrdered: daysAgo(20),
        dueDate: daysAgo(6)
      }
    })
  ])

  console.log('Referrals created')

  // DME Orders
  await Promise.all([
    prisma.dMEOrder.upsert({
      where: { orderNumber: 'DME-2024-001' },
      update: {},
      create: {
        orderNumber: 'DME-2024-001',
        patientId: patients[0].id,
        assignedToId: staff2.id,
        equipment: 'Power Wheelchair - Group 2',
        vendor: 'MedEquip Solutions - Burleson',
        urgency: 'Routine',
        status: 'Delivered',
        diagnosis: 'Heart failure, mobility impairment',
        icdCode: 'I50.20',
        payer: 'Medicare',
        authRequired: true,
        authNumber: 'AUTH-MC-DME-12345',
        quantity: 1,
        notes: 'Delivered and set up. Patient trained.',
        dateOrdered: daysAgo(45),
        dateSubmitted: daysAgo(43),
        dateDelivered: daysAgo(20)
      }
    }),
    prisma.dMEOrder.upsert({
      where: { orderNumber: 'DME-2024-002' },
      update: {},
      create: {
        orderNumber: 'DME-2024-002',
        patientId: patients[1].id,
        assignedToId: staff2.id,
        equipment: 'CPAP Machine with Heated Humidifier',
        vendor: 'SleepWell DME - Fort Worth',
        urgency: 'Routine',
        status: 'Ordered',
        diagnosis: 'Obstructive sleep apnea',
        icdCode: 'G47.33',
        payer: 'Medicare',
        authRequired: true,
        authNumber: 'AUTH-MC-DME-23456',
        quantity: 1,
        notes: 'Sleep study confirmed moderate OSA. CPAP titration done.',
        dateOrdered: daysAgo(12),
        dateSubmitted: daysAgo(10),
        dueDate: daysFromNow(2)
      }
    }),
    prisma.dMEOrder.upsert({
      where: { orderNumber: 'DME-2024-003' },
      update: {},
      create: {
        orderNumber: 'DME-2024-003',
        patientId: patients[2].id,
        assignedToId: staff2.id,
        equipment: 'Hospital Bed with Rails - Semi-Electric',
        vendor: 'HomeHealth Supplies Co.',
        urgency: 'Urgent',
        status: 'Pending',
        diagnosis: 'Dementia, fall risk, mobility impaired',
        icdCode: 'G31.84',
        payer: 'Medicare',
        authRequired: true,
        quantity: 1,
        notes: 'Patient falling frequently. Caregiver requests hospital bed for safety.',
        dateOrdered: daysAgo(8),
        dueDate: daysFromNow(0)
      }
    }),
    prisma.dMEOrder.upsert({
      where: { orderNumber: 'DME-2024-004' },
      update: {},
      create: {
        orderNumber: 'DME-2024-004',
        patientId: patients[3].id,
        assignedToId: staff2.id,
        equipment: 'Continuous Glucose Monitor (CGM) - Dexcom G7',
        vendor: 'DiabetesCare Direct',
        urgency: 'Routine',
        status: 'Denied',
        diagnosis: 'Type 2 diabetes mellitus, insulin-dependent',
        icdCode: 'E11.649',
        payer: 'Humana Medicare Advantage',
        authRequired: true,
        quantity: 1,
        notes: 'Denied - plan requires 4 fingersticks/day documentation. Appeal filed.',
        denialReason: 'Insufficient documentation of glucose testing frequency',
        dateOrdered: daysAgo(22),
        dateSubmitted: daysAgo(20)
      }
    }),
    prisma.dMEOrder.upsert({
      where: { orderNumber: 'DME-2024-005' },
      update: {},
      create: {
        orderNumber: 'DME-2024-005',
        patientId: patients[4].id,
        assignedToId: staff2.id,
        equipment: 'Nebulizer Machine with Accessories',
        vendor: 'MedEquip Solutions - Burleson',
        urgency: 'Urgent',
        status: 'Delivered',
        diagnosis: 'COPD, home nebulization required',
        icdCode: 'J44.1',
        payer: 'UnitedHealthcare Medicare Advantage',
        authRequired: false,
        quantity: 1,
        notes: 'Patient unable to use MDI due to arthritis. Nebulizer medically necessary.',
        dateOrdered: daysAgo(15),
        dateSubmitted: daysAgo(14),
        dateDelivered: daysAgo(10)
      }
    })
  ])

  console.log('DME orders created')

  // Prior Auths
  const pa1 = await prisma.priorAuth.upsert({
    where: { paNumber: 'PA-2024-001' },
    update: {},
    create: {
      paNumber: 'PA-2024-001',
      patientId: patients[0].id,
      assignedToId: staff1.id,
      serviceType: 'Referral',
      service: 'Cardiology Consultation',
      provider: 'Dr. Michael Torres',
      payer: 'Medicare',
      urgency: 'Routine',
      status: 'Approved',
      diagnosis: 'Heart failure with reduced ejection fraction',
      icdCode: 'I50.20',
      cptCode: '99243',
      authNumber: 'AUTH-MC-78901',
      dateRequested: daysAgo(20),
      dateSubmitted: daysAgo(19),
      dateDecision: daysAgo(15),
      expirationDate: daysFromNow(150)
    }
  })

  const pa2 = await prisma.priorAuth.upsert({
    where: { paNumber: 'PA-2024-002' },
    update: {},
    create: {
      paNumber: 'PA-2024-002',
      patientId: patients[4].id,
      assignedToId: staff1.id,
      serviceType: 'Referral',
      service: 'Pulmonology Consultation',
      provider: 'TBD',
      payer: 'UnitedHealthcare Medicare Advantage',
      urgency: 'Urgent',
      status: 'Denied',
      diagnosis: 'COPD with acute exacerbation',
      icdCode: 'J44.1',
      cptCode: '99244',
      denialReason: 'Not medically necessary',
      denialCode: 'CO-50',
      dateRequested: daysAgo(12),
      dateSubmitted: daysAgo(11),
      dateDecision: daysAgo(7)
    }
  })

  const pa3 = await prisma.priorAuth.upsert({
    where: { paNumber: 'PA-2024-003' },
    update: {},
    create: {
      paNumber: 'PA-2024-003',
      patientId: patients[3].id,
      assignedToId: staff2.id,
      serviceType: 'DME',
      service: 'Continuous Glucose Monitor',
      provider: 'DiabetesCare Direct',
      payer: 'Humana Medicare Advantage',
      urgency: 'Routine',
      status: 'Denied',
      diagnosis: 'Type 2 diabetes mellitus',
      icdCode: 'E11.649',
      cptCode: 'A9278',
      denialReason: 'Insufficient glucose testing documentation',
      denialCode: 'CO-96',
      dateRequested: daysAgo(24),
      dateSubmitted: daysAgo(23),
      dateDecision: daysAgo(18)
    }
  })

  await prisma.priorAuth.upsert({
    where: { paNumber: 'PA-2024-004' },
    update: {},
    create: {
      paNumber: 'PA-2024-004',
      patientId: patients[2].id,
      assignedToId: staff1.id,
      serviceType: 'Referral',
      service: 'Neurology Consultation',
      provider: 'TBD',
      payer: 'Medicare',
      urgency: 'Urgent',
      status: 'Submitted',
      diagnosis: 'Cognitive impairment',
      icdCode: 'G31.84',
      cptCode: '99244',
      dateRequested: daysAgo(4),
      dateSubmitted: daysAgo(3),
      dueDate: daysFromNow(4)
    }
  })

  console.log('Prior auths created')

  // Appeals
  await Promise.all([
    prisma.appeal.upsert({
      where: { appealNumber: 'APP-2024-001' },
      update: {},
      create: {
        appealNumber: 'APP-2024-001',
        priorAuthId: pa2.id,
        assignedToId: staff1.id,
        appealType: 'P2P',
        referenceId: 'PA-2024-002',
        payer: 'UnitedHealthcare Medicare Advantage',
        service: 'Pulmonology Consultation',
        status: 'Scheduled',
        p2pPhysician: 'Dr. Robert Chen',
        scheduledDate: daysFromNow(2),
        notes: 'P2P scheduled. Will present FEV1 data and exacerbation history.',
        createdAt: daysAgo(5)
      }
    }),
    prisma.appeal.upsert({
      where: { appealNumber: 'APP-2024-002' },
      update: {},
      create: {
        appealNumber: 'APP-2024-002',
        priorAuthId: pa3.id,
        assignedToId: staff2.id,
        appealType: 'Written',
        referenceId: 'PA-2024-003',
        payer: 'Humana Medicare Advantage',
        service: 'CGM - Dexcom G7',
        status: 'Pending',
        notes: 'Gathering 30-day glucose log and endocrinology letter of medical necessity.',
        createdAt: daysAgo(15)
      }
    })
  ])

  console.log('Appeals created')

  // Specialists directory
  await Promise.all([
    prisma.specialist.upsert({
      where: { id: 'spec-001' },
      update: {},
      create: {
        id: 'spec-001',
        name: 'Dr. Michael Torres',
        specialty: 'Cardiology',
        practice: 'JPS Health Network - Cardiology',
        address: '1500 S Main St',
        city: 'Fort Worth',
        state: 'TX',
        zip: '76104',
        phone: '817-921-3431',
        fax: '817-921-3490',
        npi: '1234567891',
        acceptMedicare: true,
        acceptMedicaid: true,
        network: 'Medicare, Medicaid, Humana, UHC, Aetna',
        waitTime: '2-3 weeks',
        notes: 'Accepts urgent referrals. Good communication back to PCP.'
      }
    }),
    prisma.specialist.upsert({
      where: { id: 'spec-002' },
      update: {},
      create: {
        id: 'spec-002',
        name: 'Dr. James Ortega',
        specialty: 'Orthopedics',
        practice: 'Burleson Bone & Joint',
        address: '750 SW Wilshire Blvd',
        city: 'Burleson',
        state: 'TX',
        zip: '76028',
        phone: '817-447-6900',
        fax: '817-447-6910',
        npi: '1234567892',
        acceptMedicare: true,
        acceptMedicaid: false,
        network: 'Medicare, Humana, UHC, BCBS',
        waitTime: '1-2 weeks',
        notes: 'Local specialist, good for geriatric patients who cannot travel far.'
      }
    }),
    prisma.specialist.upsert({
      where: { id: 'spec-003' },
      update: {},
      create: {
        id: 'spec-003',
        name: 'Dr. Karen Lee',
        specialty: 'Ophthalmology',
        practice: 'Clear Vision Eye Care',
        address: '400 Alsbury Blvd',
        city: 'Burleson',
        state: 'TX',
        zip: '76028',
        phone: '817-295-2020',
        fax: '817-295-2030',
        npi: '1234567893',
        acceptMedicare: true,
        acceptMedicaid: true,
        network: 'Medicare, Medicaid, Humana, UHC, BCBS',
        waitTime: '1 week',
        notes: 'Diabetic eye exam specialist. Accepts same-week urgent referrals.'
      }
    }),
    prisma.specialist.upsert({
      where: { id: 'spec-004' },
      update: {},
      create: {
        id: 'spec-004',
        name: 'Dr. Priya Sharma',
        specialty: 'Endocrinology',
        practice: 'Diabetes & Hormone Center of Fort Worth',
        address: '900 Eighth Ave',
        city: 'Fort Worth',
        state: 'TX',
        zip: '76104',
        phone: '817-338-9200',
        fax: '817-338-9210',
        npi: '1234567894',
        acceptMedicare: true,
        acceptMedicaid: false,
        network: 'Medicare, Humana, UHC, Aetna, BCBS',
        waitTime: '3-4 weeks',
        notes: 'Excellent with insulin management in elderly. Telehealth available.'
      }
    }),
    prisma.specialist.upsert({
      where: { id: 'spec-005' },
      update: {},
      create: {
        id: 'spec-005',
        name: 'Dr. David Nguyen',
        specialty: 'Neurology',
        practice: 'Texas Health Memory Care',
        address: '11970 Denton Dr',
        city: 'Dallas',
        state: 'TX',
        zip: '75234',
        phone: '214-879-7990',
        fax: '214-879-7999',
        npi: '1234567895',
        acceptMedicare: true,
        acceptMedicaid: true,
        network: 'Medicare, Medicaid, Humana, UHC, BCBS, Aetna',
        waitTime: '4-6 weeks',
        notes: 'Memory care specialist. Accepts Medicare. Telehealth for follow-up.'
      }
    }),
    prisma.specialist.upsert({
      where: { id: 'spec-006' },
      update: {},
      create: {
        id: 'spec-006',
        name: 'Dr. Angela Foster',
        specialty: 'Pulmonology',
        practice: 'Pulmonary Associates of Fort Worth',
        address: '1650 W Rosedale St',
        city: 'Fort Worth',
        state: 'TX',
        zip: '76104',
        phone: '817-332-4120',
        fax: '817-332-4130',
        npi: '1234567896',
        acceptMedicare: true,
        acceptMedicaid: false,
        network: 'Medicare, Humana, UHC, BCBS, Cigna',
        waitTime: '2-3 weeks',
        notes: 'COPD management specialist. Good patient education program.'
      }
    }),
    prisma.specialist.upsert({
      where: { id: 'spec-007' },
      update: {},
      create: {
        id: 'spec-007',
        name: 'Dr. Richard Kim',
        specialty: 'Nephrology',
        practice: 'Southwest Kidney Institute',
        address: '900 Eighth Ave',
        city: 'Fort Worth',
        state: 'TX',
        zip: '76104',
        phone: '817-336-3888',
        fax: '817-336-3899',
        npi: '1234567897',
        acceptMedicare: true,
        acceptMedicaid: true,
        network: 'Medicare, Medicaid, All major plans',
        waitTime: '1-2 weeks',
        notes: 'CKD management. Works well with geriatric team.'
      }
    }),
    prisma.specialist.upsert({
      where: { id: 'spec-008' },
      update: {},
      create: {
        id: 'spec-008',
        name: 'Dr. Susan Park',
        specialty: 'Dermatology',
        practice: 'Dermatology Center of Burleson',
        address: '355 SW Johnson Ave',
        city: 'Burleson',
        state: 'TX',
        zip: '76028',
        phone: '817-426-8880',
        fax: '817-426-8890',
        npi: '1234567898',
        acceptMedicare: true,
        acceptMedicaid: false,
        network: 'Medicare, Humana, UHC, BCBS',
        waitTime: '2-3 weeks',
        notes: 'Local. Specializes in skin cancer screening in elderly patients.'
      }
    })
  ])

  // Vendors
  await Promise.all([
    prisma.vendor.upsert({
      where: { id: 'vend-001' },
      update: {},
      create: {
        id: 'vend-001',
        name: 'MedEquip Solutions',
        category: 'DME',
        address: '501 S Burleson Blvd',
        city: 'Burleson',
        state: 'TX',
        zip: '76028',
        phone: '817-295-4400',
        fax: '817-295-4410',
        contact: 'Tom Bradley',
        acceptMedicare: true,
        notes: 'Local DME supplier. Fast delivery 2-3 days. Good Medicare documentation.'
      }
    }),
    prisma.vendor.upsert({
      where: { id: 'vend-002' },
      update: {},
      create: {
        id: 'vend-002',
        name: 'SleepWell DME',
        category: 'DME',
        address: '2100 N Main St',
        city: 'Fort Worth',
        state: 'TX',
        zip: '76164',
        phone: '817-625-7700',
        fax: '817-625-7710',
        contact: 'Jennifer Ross',
        acceptMedicare: true,
        notes: 'CPAP/BiPAP specialist. Compliant with CMS CPAP requirements.'
      }
    }),
    prisma.vendor.upsert({
      where: { id: 'vend-003' },
      update: {},
      create: {
        id: 'vend-003',
        name: 'HomeHealth Supplies Co.',
        category: 'DME',
        address: '900 Huguley Blvd',
        city: 'Burleson',
        state: 'TX',
        zip: '76028',
        phone: '817-447-5500',
        fax: '817-447-5510',
        contact: 'Patricia Mendez',
        acceptMedicare: true,
        notes: 'Hospital beds, wheelchairs, home safety equipment.'
      }
    }),
    prisma.vendor.upsert({
      where: { id: 'vend-004' },
      update: {},
      create: {
        id: 'vend-004',
        name: 'DiabetesCare Direct',
        category: 'DME',
        address: '1200 W Pioneer Pkwy',
        city: 'Arlington',
        state: 'TX',
        zip: '76013',
        phone: '817-861-4400',
        fax: '817-861-4410',
        contact: 'Carlos Vega',
        acceptMedicare: true,
        notes: 'CGM and insulin pump supplies. Ships direct to patient.'
      }
    }),
    prisma.vendor.upsert({
      where: { id: 'vend-005' },
      update: {},
      create: {
        id: 'vend-005',
        name: 'Huguley Medical Lab',
        category: 'Lab',
        address: '900 Huguley Blvd',
        city: 'Burleson',
        state: 'TX',
        zip: '76028',
        phone: '817-293-9110',
        fax: '817-293-9120',
        contact: 'Lab Admin',
        acceptMedicare: true,
        notes: 'On-site lab at Huguley Hospital. Results same/next day.'
      }
    }),
    prisma.vendor.upsert({
      where: { id: 'vend-006' },
      update: {},
      create: {
        id: 'vend-006',
        name: 'Quest Diagnostics - Burleson',
        category: 'Lab',
        address: '240 SW Wilshire Blvd',
        city: 'Burleson',
        state: 'TX',
        zip: '76028',
        phone: '817-447-8800',
        fax: '817-447-8810',
        contact: 'Patient Services',
        acceptMedicare: true,
        notes: 'Walk-in available. Online results. ABN on file.'
      }
    }),
    prisma.vendor.upsert({
      where: { id: 'vend-007' },
      update: {},
      create: {
        id: 'vend-007',
        name: 'Huguley Open MRI',
        category: 'Imaging',
        address: '900 Huguley Blvd',
        city: 'Burleson',
        state: 'TX',
        zip: '76028',
        phone: '817-293-9200',
        fax: '817-293-9210',
        contact: 'Scheduling',
        acceptMedicare: true,
        notes: 'Open MRI available for claustrophobic patients. No auth for Medicare.'
      }
    }),
    prisma.vendor.upsert({
      where: { id: 'vend-008' },
      update: {},
      create: {
        id: 'vend-008',
        name: 'Senior Transport Services',
        category: 'Transport',
        address: '500 SW Wilshire Blvd',
        city: 'Burleson',
        state: 'TX',
        zip: '76028',
        phone: '817-295-7700',
        fax: '',
        contact: 'Dispatch',
        acceptMedicare: false,
        notes: 'Non-emergency medical transport. Wheelchair van available. $40-80/trip.'
      }
    })
  ])

  console.log('Directory seeded')
  console.log('\n✅ Database seeding complete!')
  console.log('\n📋 Demo Login Credentials:')
  console.log('  Admin:      admin@burlesongp.com     / Admin2024!')
  console.log('  Supervisor: supervisor@burlesongp.com / Super2024!')
  console.log('  Staff:      staff@burlesongp.com      / Staff2024!')
  console.log('  Staff 2:    staff2@burlesongp.com     / Staff2024!')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
