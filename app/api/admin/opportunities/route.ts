import prisma from "@/lib/prisma";
import { opportunitySchema } from "@/schemas/opportunity.schema";
import opportunityService from "@/services/opportunity/opportunity.service";
import { getSession } from "@/lib/auth";
import { NextResponse } from "next/server";



export async function POST(req:Request){
    try {
        const session = await getSession();

        if(!session?.user?.id){
            return NextResponse.json(
                {
                    success : false,
                    message : "Unauthorized"
                },
                {
                    status : 401
                }
            )
        }
        const user = await prisma.user.findUnique({
            where:{
                id : session.user.id
            },
            select : {
                role : true
            }
        })

        if(!user?.role || user.role !== "ADMIN"){
            return NextResponse.json(
                {
                    success : false,
                    message : "Forbidden"
                },
                {
                    status : 403
                }
            )
        }

        const body = await req.json();
        const validation = opportunitySchema.safeParse(body);
        if(!validation.success){
            return NextResponse.json(
                {
                    success : false,
                    message : "Invalid input",
                    errors : validation.error?.issues
                },
                {
                    status : 400
                }
            )
        }

        const opportunity = await opportunityService.create(body);
        return NextResponse.json(
            {
                success : true,
                data : opportunity
            },
            {
                status : 201
            }
        )
    } catch (error) {
        console.log(error);
        return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      {
        status: 500,
      }
    );
    }
}

export async function GET() {
  try {
    const session = await getSession();

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      select: {
        role: true,
      },
    });

    if (!user || user.role !== "ADMIN") {
      return NextResponse.json(
        {
          success: false,
          message: "Forbidden",
        },
        { status: 403 }
      );
    }

    const opportunities =
      await opportunityService.getAll();

    return NextResponse.json({
      success: true,
      data: opportunities,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}