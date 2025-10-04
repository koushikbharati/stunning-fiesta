import { createFileRoute } from '@tanstack/react-router'
import ProfileLayout from './-components/ProfileLayout'
import {
  calculateDurationYearsMonths,
  formatExperienceDate,
} from '@/utils/DateFormat'
import Title from './-components/Title'
import NoDataFound from './-components/no-data-found'
import MainLayout from '../../-components/MainLayout'

export const Route = createFileRoute('/(app)/(users)/$username/experience')({
  component: RouteComponent,
})

function RouteComponent() {
  if (!EXPERIENCE.length)
    return (
      <MainLayout>
        <ProfileLayout>
          <NoDataFound
            message="No work experience has been listed yet. Begin building your professional profile."
            btnText="Add experience"
          />
        </ProfileLayout>
      </MainLayout>
    )
  return (
    <MainLayout>
      <ProfileLayout>
        <Title title="Experience" />
        <ul>
          {EXPERIENCE.map((exp, i) => {
            const isMultiRole = exp.roles.length > 1
            const isSameLocationInAllRoles = exp.roles.every(
              (role) => role.location === exp.roles[0].location
            )
            const isSameEmploymentTypeInAllRoles = exp.roles.every(
              (role) => role.employment_type === exp.roles[0].employment_type
            )
            const isSameLocationTypeInAllRoles = exp.roles.every(
              (role) => role.location_type === exp.roles[0].location_type
            )
            return (
              <li key={i} className="border-b p-4 last:border-none">
                {isMultiRole ? (
                  <div className="flex gap-2">
                    <div className="aspect-square size-12">
                      <img
                        src={exp.logo_url}
                        alt={exp.company_name}
                        draggable={false}
                      />
                    </div>
                    <div>
                      <div className="leading-none">
                        <h3 className="font-medium">{exp.company_name}</h3>
                        <div>
                          {isSameEmploymentTypeInAllRoles && (
                            <>
                              <span className="text-muted-foreground text-sm">
                                {exp.roles[0].employment_type}
                              </span>
                              &nbsp;&middot;&nbsp;
                            </>
                          )}
                          <span className="text-muted-foreground text-sm">
                            {calculateDurationYearsMonths(
                              exp.roles[0].start_date,
                              new Date()
                            )}
                          </span>
                        </div>
                        <div>
                          {isSameLocationInAllRoles && (
                            <>
                              <span className="text-muted-foreground text-sm">
                                {exp.roles[0].location}
                              </span>
                              &nbsp;&middot;&nbsp;
                            </>
                          )}
                          {isSameLocationTypeInAllRoles && (
                            <span className="text-muted-foreground text-sm">
                              {exp.roles[0].location_type}
                            </span>
                          )}
                        </div>
                      </div>
                      <ul className="mt-4">
                        {exp.roles.map((role, i) => (
                          <li
                            key={i}
                            className="before:bg-accent relative mb-6 before:absolute before:top-6 before:-left-8 before:h-[100%] before:w-0.5 after:absolute after:top-2 after:-left-8.5 after:size-2 after:rounded-full after:bg-gray-300 last:mb-0 last:before:hidden"
                          >
                            <div className="leading-none">
                              <p className="font-medium">{role.title}</p>
                              <div>
                                <span className="text-muted-foreground text-sm">
                                  {formatExperienceDate(role.start_date)}
                                  &nbsp;&ndash;&nbsp;
                                  {formatExperienceDate(role.end_date)}
                                </span>
                                &nbsp;&middot;&nbsp;
                                <span className="text-muted-foreground text-sm">
                                  {calculateDurationYearsMonths(
                                    role.start_date,
                                    role.end_date || new Date()
                                  )}
                                </span>
                              </div>
                              <div>
                                {!isSameLocationInAllRoles && (
                                  <>
                                    <span className="text-muted-foreground text-sm">
                                      {role.location}
                                    </span>
                                    &nbsp;&middot;&nbsp;
                                  </>
                                )}
                                {!isSameLocationTypeInAllRoles && (
                                  <span className="text-muted-foreground text-sm">
                                    {role.location_type}
                                  </span>
                                )}
                              </div>
                              {!isSameEmploymentTypeInAllRoles && (
                                <span className="text-muted-foreground text-sm">
                                  {role.employment_type}
                                </span>
                              )}
                            </div>
                            <p className="mt-4 text-sm whitespace-pre-line">
                              {role.description}
                            </p>
                            <ul className="mt-6 inline-flex flex-wrap items-start gap-1">
                              {role.skills.map((skill) => (
                                <SkillTag key={skill} skill={skill} />
                              ))}
                            </ul>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <div className="aspect-square size-12">
                      <img
                        src={exp.logo_url}
                        alt={exp.company_name}
                        draggable={false}
                      />
                    </div>
                    <div>
                      <div className="leading-none">
                        <h3 className="font-medium">{exp.roles[0].title}</h3>
                        <div>
                          <span className="text-muted-foreground text-sm">
                            {exp.company_name}
                          </span>
                          &nbsp;&middot;&nbsp;
                          <span className="text-muted-foreground text-sm">
                            {exp.roles[0].employment_type}
                          </span>
                        </div>
                        <div>
                          <span className="text-muted-foreground text-sm">
                            {formatExperienceDate(exp.roles[0].start_date)}
                            &nbsp;&ndash;&nbsp;
                            {formatExperienceDate(exp.roles[0].end_date)}
                          </span>
                          &nbsp;&middot;&nbsp;
                          <span className="text-muted-foreground text-sm">
                            {calculateDurationYearsMonths(
                              exp.roles[0].start_date,
                              exp.roles[0].end_date || new Date()
                            )}
                          </span>
                        </div>
                        <div>
                          <span className="text-muted-foreground text-sm">
                            {exp.roles[0].location}
                          </span>
                          &nbsp;&middot;&nbsp;
                          <span className="text-muted-foreground text-sm">
                            {exp.roles[0].location_type}
                          </span>
                        </div>
                      </div>
                      <p className="mt-4 text-sm whitespace-pre-line">
                        {exp.roles[0].description}
                      </p>
                      <ul className="mt-6 inline-flex flex-wrap items-start gap-1">
                        {exp.roles[0].skills.map((skill) => (
                          <SkillTag key={skill} skill={skill} />
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </li>
            )
          })}
        </ul>
      </ProfileLayout>
    </MainLayout>
  )
}

function SkillTag({ skill }: { skill: string }) {
  return (
    <li className="bg-muted rounded-full px-2 py-1 text-xs whitespace-nowrap">
      {skill}
    </li>
  )
}

const EXPERIENCE = [
  {
    company_id: 101,
    company_name: 'ADSMN',
    logo_url:
      'https://media.licdn.com/dms/image/v2/D4D0BAQEqFT_UsU4c9A/company-logo_100_100/B4DZjDjYyZHsAQ-/0/1755627491751/adsmn_logo?e=1761177600&v=beta&t=buSOlu2cv4yVSaMBAGCFroaw4EWfz1VEMXnWiCeaWjM',
    roles: [
      {
        title: 'Full Stack Developer',
        employment_type: 'Full-time',
        location: 'Mumbai, Maharashtra, India',
        location_type: 'On-site',
        start_date: new Date('2025-05-01'),
        end_date: null,
        is_current: true,
        description:
          '- Build secure and robust RESTful APIs using Node.js, Express, alongside develop and maintain scalable frontend architecture with React.\n\n- Setup and manage cloud-based deployment pipelines, including serverless functions, API gateways, S3 buckets, and CloudFront.',
        skills: [
          'React.js',
          'TypeScript',
          'JavaScript (ES6+)',
          'Tailwind CSS',
          'Shadcn UI',
          'Motion',
        ],
      },
      {
        title: 'Frontend Developer',
        employment_type: 'Full-time',
        location: 'Mumbai, Maharashtra, India',
        location_type: 'On-site',
        start_date: new Date('2023-12-01'),
        end_date: new Date('2025-04-30'),
        is_current: false,
        description:
          '- Build secure and robust RESTful APIs using Node.js, Express, alongside develop and maintain scalable frontend architecture with React.\n\n- Setup and manage cloud-based deployment pipelines, including serverless functions, API gateways, S3 buckets, and CloudFront.',
        skills: [
          'Node.js',
          'Express.js',
          'React.js',
          'TypeScript',
          'Tailwind CSS',
          'Amazon Web Services (AWS)',
          'PostgreSQL',
        ],
      },
    ],
  },
  {
    company_id: 202,
    company_name: 'Maharashtra Housing Development Corporation Limited',
    logo_url:
      'https://media.licdn.com/dms/image/v2/D560BAQGQF4NC5Hru9Q/company-logo_100_100/company-logo_100_100/0/1688473836205?e=1761177600&v=beta&t=-frmdGMK9frA92yUqS5ZxOdmSuy5Vhk8nfKN4nFQtbM',
    roles: [
      {
        title: 'Associate Frontend Developer',
        employment_type: 'Full-time',
        location: 'Mumbai, Maharashtra, India',
        location_type: 'On-site',
        start_date: new Date('2021-10-01'),
        end_date: new Date('2023-10-31'),
        is_current: false,
        description:
          '- Build secure and robust RESTful APIs using Node.js, Express, alongside develop and maintain scalable frontend architecture with React.\n\n- Setup and manage cloud-based deployment pipelines, including serverless functions, API gateways, S3 buckets, and CloudFront.',
        skills: [
          'React.js',
          'JavaScript (ES6+)',
          'Tailwind CSS',
          'Figma',
          'HTML5',
          'CSS3',
        ],
      },
    ],
  },
]
